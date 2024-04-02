import { Component, computed } from '@angular/core';
import { GoogleMap } from '@angular/google-maps';

import { SearchFormComponent, SearchValue } from './components/search-form';
import { DEFAULTS, ORIGINS } from './components/search-form/search-form.data';

@Component({
  standalone: true,
  imports: [SearchFormComponent, GoogleMap],
  selector: 'qs-root',
  templateUrl: './app.component.html',
})
export class AppComponent {
  private map!: google.maps.Map;
  private mapCircle!: google.maps.Circle;

  readonly mapOptions = computed<google.maps.MapOptions>(() => {
    return {
      center: this.getPositionFromOrigin(DEFAULTS['origin']),
      zoom: 16,
    };
  });

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
    // Update circle position and radius
    this.mapCircle.setCenter(center);
    this.mapCircle.setRadius(value.radius);
    this.map.panTo(center);
  }
}
