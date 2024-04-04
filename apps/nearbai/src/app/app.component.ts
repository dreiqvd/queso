import { NgClass } from '@angular/common';
import {
  AfterViewInit,
  Component,
  computed,
  ElementRef,
  HostListener,
  NgZone,
  OnInit,
  Renderer2,
  signal,
  ViewChild,
} from '@angular/core';
import { GoogleMap, MapMarker } from '@angular/google-maps';
import { Subject } from 'rxjs';

import { getViewportHeight } from '@queso/common';
import { AnimationsDirective } from '@queso/common/directives';
import { IconComponent } from '@queso/ui-kit/icon';
import { PillComponent } from '@queso/ui-kit/pill';

import { SearchFormComponent, SearchValue } from './components/search-form';
import { DEFAULTS, ORIGINS } from './components/search-form/search-form.data';

@Component({
  standalone: true,
  imports: [
    NgClass,
    GoogleMap,
    MapMarker,
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
  @ViewChild('resultsWrapper') resultsWrapperRef!: ElementRef<HTMLElement>;

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

  constructor(
    private ngZone: NgZone,
    private renderer: Renderer2
  ) {}

  ngOnInit(): void {
    this.nearbySearch$.subscribe(() => {
      if (this.searchAllDone && this.searchOpenDone) {
        this.mergeSearchResults();
      }
    });
  }

  ngAfterViewInit(): void {
    this.setSearchResultsWrapperHeight();
  }

  @HostListener('window:resize')
  onWindowResize(): void {
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
    return {
      id: result.place_id || '',
      name: result.name || '',
      location: result.geometry?.location,
      address: result.vicinity || '',
      ratings: result.rating,
      ratingsTotal: result.user_ratings_total,
      isOpen: openNow,
      imgUrl: result.photos?.length
        ? result.photos[0].getUrl()
        : `https://via.placeholder.com/100x120.jpg?text=${result.name}`,
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
    const wrapperElement = this.resultsWrapperRef.nativeElement;
    const offsetTop = wrapperElement.getBoundingClientRect().top;
    const wrapperHeight = getViewportHeight() - offsetTop - 48; // 24px padding
    this.renderer.setStyle(wrapperElement, 'height', `${wrapperHeight}px`);
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

    const defaultCenter = this.getPositionFromOrigin(DEFAULTS['origin']);
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
  }

  onSearch(value: SearchValue): void {
    this.showLoader.set(true);
    const center = this.getPositionFromOrigin(value.origin);
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

  /** Display directions/route from the center of the active circle
   * going to the selected item.
   */
  showDirections(destination: SearchResult['location']): void {
    if (!destination) return;
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
}

interface SearchResult {
  id: string;
  name: string;
  imgUrl: string;
  address: string;
  isOpen: boolean | undefined;
  location?: google.maps.LatLng;
  ratings?: number;
  ratingsTotal?: number;
}
