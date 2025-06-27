import { Component, inject, OnInit, signal } from '@angular/core';

import { QsAnimations } from '@queso/common/animations';

import { Loader } from '../../components/loader/loader';
import { RegistryGift } from '../../models/GiftRegistry';
import { GiftRegistryService } from '../../services/gift-registry';

import { GiftItem } from './gift-item/gift-item';

@Component({
  selector: 'app-gift-registry-page',
  imports: [QsAnimations, Loader, GiftItem],
  templateUrl: './gift-registry-page.html',
})
export class GiftRegistryPage implements OnInit {
  private readonly giftRegistryService = inject(GiftRegistryService);

  protected readonly gifts = signal<RegistryGift[]>([]);
  protected readonly isLoading = signal(true);
  protected readonly showError = signal(false);

  ngOnInit(): void {
    this.fetchGifts();
  }

  private fetchGifts(): void {
    this.isLoading.set(true);
    this.giftRegistryService.getGiftRegistryItems().subscribe({
      next: (gifts) => {
        this.gifts.set(gifts);
        this.isLoading.set(false);
      },
      error: () => {
        this.isLoading.set(false);
        this.showError.set(true);
      },
    });
  }
}
