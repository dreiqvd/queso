import { NgClass } from '@angular/common';
import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  NgZone,
  OnInit,
  signal,
  ViewChild,
} from '@angular/core';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MatTooltip } from '@angular/material/tooltip';
import { debounceTime, fromEvent, Subject } from 'rxjs';

import {
  BREAKPOINTS,
  getViewportHeight,
  getViewportWidth,
} from '@queso/common';
import { AnimationsDirective } from '@queso/common/directives';
import { PlatformService } from '@queso/common/services';
import { IconComponent } from '@queso/ui-kit/icon';
import { PillComponent } from '@queso/ui-kit/pill';

import { SearchFormComponent, SearchValue } from './components/search-form';
import {
  DEFAULTS,
  Origin,
  ORIGINS,
} from './components/search-form/search-form.data';

@Component({
  standalone: true,
  imports: [
    NgClass,
    MatTooltip,
    GoogleMap,
    MapMarker,
    MapInfoWindow,
    AnimationsDirective,
    SearchFormComponent,
    IconComponent,
    PillComponent,
  ],
  selector: 'qs-root',
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit, AfterViewInit {
  @ViewChild(MapInfoWindow) infoWindow?: MapInfoWindow;
  @ViewChild('resultsWrapper') resultsWrapperRef?: ElementRef<HTMLElement>;

  // Map properties
  private map!: google.maps.Map;
  private mapCircle!: google.maps.Circle;
  readonly mapOptions = computed<google.maps.MapOptions>(() => {
    return {
      center: this.getPositionFromOrigin(DEFAULTS['origin']),
      zoom: 16,
    };
  });

  // Services
  private placesService!: google.maps.places.PlacesService;
  private directionsService!: google.maps.DirectionsService;
  private directionsRendererService!: google.maps.DirectionsRenderer;

  // Properties related to searching
  readonly showResults = signal(false);
  readonly searchResults = signal<SearchResult[]>([]);
  private nearbySearch$ = new Subject<void>();
  private searchAllDone = false;
  private searchOpenDone = false;
  private searchAllResults: google.maps.places.PlaceResult[] = [];
  private searchOpenResults: google.maps.places.PlaceResult[] = [];

  // Misc
  readonly showLoader = signal(false);
  readonly activeMarker = signal<ActiveMarker | null>(null);
  readonly isSidebarOpen = signal(true);
  readonly showSidebarContent = signal(true);
  readonly resultsWrapperHeight = signal<string>('auto');
  readonly isSmallViewPort = signal(this.isUsingSmallViewPort());
  readonly showLocationAccessMsg = signal(false);
  readonly currentCenter = signal<MapCenter | null>(null);

  constructor(
    private ngZone: NgZone,
    private platformService: PlatformService
  ) {}

  ngOnInit(): void {
    this.nearbySearch$.subscribe(() => {
      if (this.searchAllDone && this.searchOpenDone) {
        this.mergeSearchResults();
      }
    });

    if (this.platformService.isUsingBrowser()) {
      fromEvent(window, 'resize')
        .pipe(debounceTime(300))
        .subscribe(() => {
          this.isSmallViewPort.set(this.isUsingSmallViewPort());
          this.setSearchResultsWrapperHeight();
        });
    }
  }

  ngAfterViewInit(): void {
    this.setSearchResultsWrapperHeight();
  }

  /** Merge the results from Search All and Search Open query
   * Context for merging: https://developers.google.com/maps/documentation/javascript/place_field_js_migration
   */
  private mergeSearchResults(): void {
    // Map the "Open" stores first to the current results
    const currentResults = this.searchOpenResults.map((r) => {
      return this.mapSearchResult(r, true);
    });

    // Map the "Closed" stores or stores with missing business hours
    this.searchAllResults.forEach((r) => {
      if (!currentResults.find((c) => c.id === r.place_id)) {
        // Only set as "Closed" if opening_hours is defined; otherwise set as "Missing Business Hours"
        const businessHours = r.opening_hours === undefined ? undefined : false;
        currentResults.push(this.mapSearchResult(r, businessHours));
      }
    });

    // Running inside the ngZone to update the UI. This is necessary to avoid the issue of changes
    // not being detected when running function inside a library script (e.g. nearbySearch callback)
    this.ngZone.run(() => {
      // Set a minimum of 1 second delay to show the loader
      setTimeout(() => {
        this.showLoader.set(false);
        this.showResults.set(true);
        this.searchResults.set(currentResults);
      }, 1000);
    });
  }

  /**
   * Map the search result into a template display format.
   */
  private mapSearchResult(
    result: google.maps.places.PlaceResult,
    openNow: boolean | undefined
  ): SearchResult {
    const reviewsText = result.user_ratings_total === 1 ? 'review' : 'reviews';
    const ratingsText = result.rating
      ? `${result.rating} (${result.user_ratings_total?.toLocaleString()} ${reviewsText})`
      : 'No reviews';

    return {
      id: result.place_id || '',
      name: result.name || '',
      location: result.geometry?.location,
      address: result.vicinity || '',
      ratingsText,
      isOpen: openNow,
      imgUrl: result.photos?.length ? result.photos[0].getUrl() : undefined,
    };
  }

  /**
   * Returns the lat-lng pair value of an origin location.
   */
  private getPositionFromOrigin(origin: string): google.maps.LatLngLiteral {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    return ORIGINS.find((o) => o.value === origin)!
      .position as google.maps.LatLngLiteral;
  }

  /**
   * Compute the height of the search results wrapper element
   */
  private setSearchResultsWrapperHeight(): void {
    if (
      this.platformService.isUsingBrowser() &&
      this.resultsWrapperRef &&
      !this.isSmallViewPort()
    ) {
      const wrapperElement = this.resultsWrapperRef.nativeElement;
      const offsetTop = wrapperElement.getBoundingClientRect().top;
      const wrapperHeight = getViewportHeight() - offsetTop - 48; // account for padding
      this.resultsWrapperHeight.set(`${wrapperHeight}px`);
    } else {
      this.resultsWrapperHeight.set('auto');
    }
  }

  /** Determines if current viewport is for small screen */
  private isUsingSmallViewPort(): boolean {
    if (this.platformService.isUsingBrowser()) {
      return getViewportWidth() <= BREAKPOINTS.MOBILE_MD;
    }

    return false;
  }

  /** Search for places using Google API */
  private searchPlaces(
    value: SearchValue,
    center: google.maps.LatLngLiteral
  ): void {
    const radius = value.radius;

    // Update circle position and radius
    this.mapCircle.setCenter(center);
    this.mapCircle.setRadius(radius);
    this.map.panTo(center);

    const params = {
      location: center,
      radius: radius,
      type: value.category,
    };

    const handleResults = (
      res: google.maps.places.PlaceResult[] | null,
      status: google.maps.places.PlacesServiceStatus
    ): void => {
      if (status !== google.maps.places.PlacesServiceStatus.OK || !res) {
        return;
      }
      this.nearbySearch$.next();
    };

    /**
     * As per this documentation: https://developers.google.com/maps/documentation/javascript/place_field_js_migration,
     * to handle the deprecation for open_now, two requests should be made to fetch open and closed places.
     */
    this.placesService.nearbySearch(
      { ...params, openNow: false },
      (res, status) => {
        this.searchAllDone = true;
        this.searchAllResults = res || [];
        handleResults(res, status);
      }
    );

    this.placesService.nearbySearch(
      { ...params, openNow: true },
      (res, status) => {
        this.searchOpenDone = true;
        this.searchOpenResults = res || [];
        handleResults(res, status);
      }
    );
  }

  /** Reset states */
  private reset(): void {
    this.showLocationAccessMsg.set(false);
    this.showResults.set(false);
    this.currentCenter.set(null);
    this.searchResults.set([]);
  }

  /**
   * Function that is called once the Google Map is ready. It saves the map
   * instance and creates a circle overlay on the map.
   */
  onMapInitialized(map: google.maps.Map): void {
    this.map = map;

    // Set services
    this.placesService = new google.maps.places.PlacesService(map);
    this.directionsService = new google.maps.DirectionsService();
    this.directionsRendererService = new google.maps.DirectionsRenderer({
      map,
    });

    const defaultOrigin = ORIGINS.find(
      (o) => o.value === DEFAULTS.origin
    ) as Origin;

    const defaultCenter = defaultOrigin.position;

    this.mapCircle = new google.maps.Circle({
      map,
      center: defaultCenter,
      strokeColor: '#ffdca6',
      fillColor: '#ffdca6',
      fillOpacity: 0.35,
      strokeOpacity: 0.8,
      strokeWeight: 2,
      radius: DEFAULTS['radius'],
    });

    if (defaultCenter) {
      this.currentCenter.set({
        location: defaultCenter,
        name: defaultOrigin.label,
      });
    }
  }

  /**
   * Function that is called when search has been initialized.
   */
  onSearch(value: SearchValue): void {
    this.showLoader.set(true);
    this.reset();
    if (value.origin === 'current') {
      // Request for location access if not yet granted
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.map.panTo(center);
          this.currentCenter.set({
            name: 'Current Location',
            location: center,
          });
          this.searchPlaces(value, center);
        },
        (): void => {
          console.log('access has been denied');
          this.showLoader.set(false);
          this.showLocationAccessMsg.set(true);
        }
      );
    } else {
      const center = this.getPositionFromOrigin(value.origin);
      // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
      const name = ORIGINS.find((o) => o.value === value.origin)!
        .label as string;
      this.currentCenter.set({ name, location: center });
      this.searchPlaces(value, center);
    }
  }

  /**
   * Called when a marker is clicked. It sets the active marker and opens the info window.
   * Marker can be the center of the circle or a search result item.
   */
  onMarkerClick(marker: MapMarker, item: SearchResult | 'center'): void {
    if (item === 'center') {
      const center = this.currentCenter() as MapCenter;
      this.activeMarker.set({
        id: 'center',
        name: center.name,
        address: '',
      });
    } else {
      this.activeMarker.set({
        id: item.id,
        name: item.name,
        address: item.address,
        ratingsText: item.ratingsText,
      });
    }

    this.infoWindow?.open(marker);
  }

  /** Display directions/route from the center of the active circle
   * going to the selected item.
   */
  showDirections(destination: SearchResult['location']): void {
    if (!destination) return;
    if (getViewportWidth() <= BREAKPOINTS.TABLET_MD) {
      this.toggleSidear();
    }

    this.directionsService
      .route({
        origin: {
          location: this.mapCircle.getCenter(),
        },
        destination: {
          location: destination,
        },
        travelMode: google.maps.TravelMode.DRIVING,
      })
      .then((response) => {
        this.directionsRendererService.setDirections(response);
      })
      .catch((e) => console.log('Directions request failed due to: ' + e));
  }

  /** Collapse or opens the sidebar */
  toggleSidear(): void {
    this.isSidebarOpen.set(!this.isSidebarOpen());
    if (this.isSidebarOpen()) {
      // allow a delay before showing the sidebar content
      setTimeout(() => {
        this.showSidebarContent.set(true);
      }, 500);
    } else {
      this.showSidebarContent.set(false);
    }
  }
}

interface SearchResult {
  id: string;
  name: string;
  address: string;
  isOpen?: boolean;
  imgUrl?: string;
  location?: google.maps.LatLng | google.maps.LatLngLiteral;
  ratingsText?: string;
}

interface ActiveMarker {
  id: string;
  name: string;
  address?: string;
  ratingsText?: string;
}

interface MapCenter {
  name: string;
  location: google.maps.LatLng | google.maps.LatLngLiteral;
}
