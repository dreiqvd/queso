import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

import { RegistryGift } from '../../models/GiftRegistry';

import { GIFT_REGISTRY_ITEMS } from './gift-registry.data';

@Injectable({
  providedIn: 'root',
})
export class GiftRegistryService {
  getGiftRegistryItems(): Observable<RegistryGift[]> {
    return of(GIFT_REGISTRY_ITEMS).pipe(delay(0));
  }
}
