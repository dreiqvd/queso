import { Component, computed, signal } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

import { IconComponent } from '@queso/ui-kit/icon';

import { SearchFormComponent, SearchValue } from './components/search-form';
import {
  data,
  DEFAULTS,
  ORIGINS,
} from './components/search-form/search-form.data';

@Component({
  standalone: true,
  imports: [GoogleMap, SearchFormComponent, IconComponent],
  selector: 'qs-root',
  templateUrl: './app.component.html',
  styles: `
    // 162, 173, 185
    .card {
      box-shadow:
        rgba(162, 173, 185, 0.35) 0px 6px 24px 0px,
        rgba(162, 173, 185, 0.08) 0px 0px 0px 1px;
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
