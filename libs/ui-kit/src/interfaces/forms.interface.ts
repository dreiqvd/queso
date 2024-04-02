import {} from '@angular/google-maps';

export interface SelectableItem {
  label: string;
  value: string | number;
  position?: google.maps.LatLngLiteral;
}
