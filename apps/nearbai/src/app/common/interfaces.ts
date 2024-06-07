import {} from '@angular/google-maps';

import { SelectableItem } from '@queso/ui-kit';

export interface SearchParams {
  origin: string;
  category: string;
  radius: number;
}

export interface Origin extends SelectableItem {
  position?: google.maps.LatLngLiteral;
}

export interface SearchResult {
  id: string;
  name: string;
  address: string;
  markerElement?: HTMLElement;
  isOpen?: boolean;
  imgUrl?: string;
  location?: google.maps.LatLng | google.maps.LatLngLiteral;
  ratingsText?: string;
}

export interface ActiveMarker {
  id: string;
  name: string;
  address?: string;
  ratingsText?: string;
}

export interface MapCenter {
  name: string;
  location: google.maps.LatLng | google.maps.LatLngLiteral;
  markerElement?: HTMLElement;
}
