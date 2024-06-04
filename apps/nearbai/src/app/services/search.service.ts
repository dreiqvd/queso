import { inject, Injectable, NgZone } from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Subject } from 'rxjs';

import {
  MapCenter,
  Origin,
  SearchParams,
  SearchResult,
} from '../app.interface';
import { ORIGINS } from '../components/search-form/search-form.data';

@Injectable()
export class SearchService {
  private map!: google.maps.Map;
  private mapCircle!: google.maps.Circle;
  private placesService!: google.maps.places.PlacesService;
  private nearbySearch$ = new Subject<void>();
  private searchAllDone = false;
  private searchOpenDone = false;
  private searchAllResults: google.maps.places.PlaceResult[] = [];
  private searchOpenResults: google.maps.places.PlaceResult[] = [];

  public searchParams: SearchParams | null = null;
  public searchCenter: MapCenter | null = null;
  public searchStarted$ = new Subject<void>();
  public searchEnded$ = new Subject<SearchResult[] | 'DENIED'>();

  private ngZone = inject(NgZone);

  constructor() {
    this.nearbySearch$.pipe(takeUntilDestroyed()).subscribe(() => {
      if (this.searchAllDone && this.searchOpenDone) {
        this.mergeSearchResults();
      }
    });
  }

  /** Search for places using Google API */
  private searchPlaces(
    value: SearchParams,
    center: google.maps.LatLngLiteral
  ): void {
    this.searchParams = value;
    const radius = value.radius;
    this.mapCircle.setRadius(radius);
    this.mapCircle.setCenter(center);
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
      this.searchEnded$.next(currentResults);
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

  public search(value: SearchParams): void {
    this.searchStarted$.next();
    if (value.origin === 'current') {
      // Request for location access if not yet granted
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const center = {
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          };
          this.searchCenter = {
            name: 'Current Location',
            location: center,
          };
          this.searchPlaces(value, center);
        },
        (): void => {
          console.log('access has been denied');
          this.searchEnded$.next('DENIED');
        }
      );
    } else {
      const source = ORIGINS.find((o) => o.value === value.origin) as Origin;
      const center = source.position as google.maps.LatLngLiteral;
      this.searchCenter = { name: source.label, location: center };
      this.searchPlaces(value, center);
    }
  }

  /** Set the value of the map */
  public setMap(map: google.maps.Map, circle: google.maps.Circle): void {
    this.map = map;
    this.mapCircle = circle;
    this.placesService = new google.maps.places.PlacesService(map);
  }
}
