import { NgClass } from '@angular/common';
import { Component, computed, signal } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

import { IconComponent } from '@queso/ui-kit/icon';
import { PillComponent } from '@queso/ui-kit/pill';

import { SearchFormComponent, SearchValue } from './components/search-form';
import {
  data,
  DEFAULTS,
  ORIGINS,
} from './components/search-form/search-form.data';

@Component({
  standalone: true,
  imports: [
    NgClass,
    GoogleMap,
    SearchFormComponent,
    IconComponent,
    PillComponent,
  ],
  selector: 'qs-root',
  templateUrl: './app.component.html',
  styles: `
    .card {
      box-shadow:
        rgba(162, 173, 185, 0.35) 0px 6px 24px 0px,
        rgba(162, 173, 185, 0.08) 0px 0px 0px 1px;
    }

    qs-pill {
      margin-bottom: 2px;
      display: inline-block;

      ::ng-deep {
        .pill {
          text-transform: capitalize;
        }
      }

      &.open {
        --pill-bg-color: var(--color-green-100);
        --pill-text-color: var(--color-green-600);
      }

      &.closed {
        --pill-bg-color: var(--color-warn-100);
        --pill-text-color: var(--color-warn-600);
      }
    }
  `,
})
export class AppComponent {
  // Map properties
  private map!: google.maps.Map;
  private mapCircle!: google.maps.Circle;
  readonly mapOptions = computed<google.maps.MapOptions>(() => {
    return {
      center: this.getPositionFromOrigin(DEFAULTS['origin']),
      zoom: 16,
    };
  });

  readonly showResults = signal(false);
  readonly searchResults = signal<SearchResult[]>([]);

  // Services
  private placesService!: google.maps.places.PlacesService;
  private directionsService!: google.maps.DirectionsService;
  private directionsRendererService!: google.maps.DirectionsRenderer;

  /**
   * Returns the lat-lng pair value of an origin location
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
    const center = this.getPositionFromOrigin(value.origin);
    const radius = value.radius;
    // Update circle position and radius
    this.mapCircle.setCenter(center);
    this.mapCircle.setRadius(radius);
    this.map.panTo(center);

    // this.placesService.nearbySearch(
    //   {
    //     location: center,
    //     radius: radius,
    //     type: value.category,
    //   },
    //   (res, status) => {
    //     if (status !== google.maps.places.PlacesServiceStatus.OK || !results) {
    //       return;
    //     }

    //     console.log(res);
    //   }
    // );
    const results: SearchResult[] = data.map((d) => {
      return {
        id: d.place_id,
        name: d.name,
        location: d.geometry.location,
        address: d.vicinity,
        ratings: d.rating,
        ratingsTotal: d.user_ratings_total,
        isOpen: true,
        imgUrl: `https://via.placeholder.com/98x98.jpg?text=${d.name}`,
      };
    });

    this.searchResults.set(results);

    this.showResults.set(true);
  }

  /** Display directions/route from the center of the active circle
   * going to the selected item.
   */
  showDirections(destination: google.maps.LatLngLiteral): void {
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
  location: google.maps.LatLngLiteral;
  isOpen: boolean;
  ratings?: number;
  ratingsTotal?: number;
}
