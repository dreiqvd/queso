import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class QsPlatformService {
  private readonly platformId = inject(PLATFORM_ID);

  get isUsingBrowser(): boolean {
    return isPlatformBrowser(this.platformId);
  }
}
