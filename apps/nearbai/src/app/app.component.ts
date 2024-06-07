import { NgClass } from '@angular/common';
import { Component, computed, inject, signal, ViewChild } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { GoogleMap, MapInfoWindow, MapMarker } from '@angular/google-maps';
import { MatTooltip } from '@angular/material/tooltip';

import { BREAKPOINTS, getViewportWidth } from '@queso/common';
import { AnimationsDirective } from '@queso/common/directives';
import { IconComponent } from '@queso/ui-kit/icon';
import { PillComponent } from '@queso/ui-kit/pill';

import { ActiveMarker, MapCenter, Origin, SearchResult } from './app.interface';
import { SearchFormComponent } from './components/search-form';
import { DEFAULTS, ORIGINS } from './components/search-form/search-form.data';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { SearchService } from './services/search.service';

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
    SidebarComponent,
  ],
  selector: 'qs-root',
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
export class AppComponent {
  @ViewChild(MapInfoWindow) infoWindow?: MapInfoWindow;
  @ViewChild(SidebarComponent) sidebar!: SidebarComponent;

  private readonly searchService = inject(SearchService);

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

  constructor() {
    this.searchService.searchStarted$
      .pipe(takeUntilDestroyed())
      .subscribe(() => {
        this.onSearchStart();
      });

    this.searchService.searchEnded$
      .pipe(takeUntilDestroyed())
      .subscribe((val) => {
        this.onSearchEnd(val);
      });
  }

  private onSearchStart(): void {
    this.searchResults.set([]);
  }

  private onSearchEnd(results: SearchResult[] | 'DENIED'): void {
    if (results !== 'DENIED') {
      this.currentCenter.set(this.searchService.searchCenter);

      // Add a delay to be in sync with the search loading animation
      setTimeout(() => {
        this.searchResults.set(results);
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
   * Function that is called once the Google Map is ready. It saves the map
   * instance and creates a circle overlay on the map.
   */
  onMapInitialized(map: google.maps.Map): void {
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
      });
    }

    this.searchService.setMap(map, this.mapCircle);
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
