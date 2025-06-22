import {
  Component,
  computed,
  inject,
  Renderer2,
  signal,
  ViewChild,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import {
  GoogleMap,
  MapAdvancedMarker,
  MapInfoWindow,
} from '@angular/google-maps';

import { BREAKPOINTS, getViewportWidth } from '@queso/common';
import { QsIcon } from '@queso/ui-kit/icon';

import { DEFAULTS, ORIGINS } from './components/search-form/search-form.data';
import { Sidebar } from './components/sidebar/sidebar.component';
import {
  ActiveMarker,
  MapCenter,
  Origin,
  SearchResult,
} from './core/interfaces';
import { SearchService } from './services';

@Component({
  imports: [GoogleMap, MapAdvancedMarker, MapInfoWindow, QsIcon, Sidebar],
  selector: 'app-root',
  styles: `
    .sidebar {
      transition: width 0.5s ease;

      &.closed {
        width: 80px;
      }
    }
  `,
  templateUrl: './app.component.html',
})
export class App {
  @ViewChild(MapInfoWindow) infoWindow?: MapInfoWindow;
  @ViewChild(Sidebar) sidebar!: Sidebar;

  private readonly searchService = inject(SearchService);
  private readonly renderer = inject(Renderer2);

  // Map properties
  private mapCircle!: google.maps.Circle;
  readonly mapOptions = computed<google.maps.MapOptions>(() => {
    return {
      center: this.getPositionFromOrigin(DEFAULTS['origin']),
      zoom: 16,
    };
  });
  readonly searchResults = signal<SearchResult[]>([]);

  // Services
  private directionsService!: google.maps.DirectionsService;
  private directionsRendererService!: google.maps.DirectionsRenderer;

  // Misc
  readonly showLoader = signal(false);
  readonly activeMarker = signal<ActiveMarker | null>(null);
  readonly currentCenter = signal<MapCenter | null>(null);
  readonly isSidebarOpen = signal(true);
  markerOptions: google.maps.marker.AdvancedMarkerElementOptions = {};

  constructor() {
    this.searchService.searchStarted$
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.handleSearchStart();
      });

    this.searchService.searchEnded$
      .pipe(takeUntilDestroyed())
      .subscribe((val) => {
        this.handleSearchEnd(val);
      });
  }

  private handleSearchStart(): void {
    this.searchResults.set([]);
  }

  private handleSearchEnd(results: SearchResult[] | 'DENIED'): void {
    if (results !== 'DENIED') {
      this.currentCenter.set({
        ...this.searchService.searchCenter,
        markerElement: this.getMarkerElement('red'),
      } as MapCenter);

      // Add a delay to be in sync with the search loading animation
      setTimeout(() => {
        this.searchResults.set(
          results.map((r) => ({
            ...r,
            markerElement: this.getMarkerElement('yellow'),
          }))
        );
      }, 800);
    }
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
   * As documented from the Google Maps API, to have a custom icon (content) for AdvancedMarkerElement,
   * it is required to have a unique instance of the content element for each marker. This function
   * generates an image instance of the content on the fly.
   *
   * "AdvancedMarkerElement does not clone the passed-in DOM element. Once the DOM element
   * is passed to an AdvancedMarkerElement, passing the same DOM element to another AdvancedMarkerElement
   * will move the DOM element and cause the previous AdvancedMarkerElement to look empty."
   *
   * Reference: https://developers.google.com/maps/documentation/javascript/reference/advanced-markers#AdvancedMarkerElementOptions.content
   */
  private getMarkerElement(color: string): HTMLElement {
    const markerElement = this.renderer.createElement('img');
    markerElement.src = `assets/img/marker-${color}.png`;
    return markerElement;
  }

  /**
   * Function that is called once the Google Map is ready. It saves the map
   * instance and creates a circle overlay on the map.
   */
  async onMapInitialized(map: google.maps.Map): Promise<void> {
    await google.maps.importLibrary('places');

    // Set services
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
        markerElement: this.getMarkerElement('red'),
      });
    }

    this.searchService.setMap(map, this.mapCircle);
  }

  /**
   * Called when a marker is clicked. It sets the active marker and opens the info window.
   * Marker can be the center of the circle or a search result item.
   */
  onMarkerClick(
    marker: MapAdvancedMarker,
    item: SearchResult | 'center'
  ): void {
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
      this.sidebar.onToggleSidebar();
    }

    this.directionsService
      .route({
        origin: {
          location: (this.searchService.searchCenter as MapCenter).location,
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
