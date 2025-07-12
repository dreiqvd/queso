import { CurrencyPipe } from '@angular/common';
import { Component, inject, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { QsDialogService } from '@queso/ui-kit/dialog';

import { RegistryGift } from '../../../models/GiftRegistry';

import { GiftDetails } from './gift-details/gift-details';

@Component({
  selector: 'app-gift-item',
  imports: [CurrencyPipe, MatButtonModule],
  templateUrl: './gift-item.html',
  styles: `
    .container {
      background-image: url('/images/frame.webp');
      background-size: contain;
      background-position: center;
      background-repeat: no-repeat;
    }
  `,
})
export class GiftItem {
  readonly gift = input.required<RegistryGift>();

  private readonly dialogService = inject(QsDialogService);

  openGift(): void {
    this.dialogService.showCustomComponent(
      this.gift().name,
      GiftDetails,
      {
        gift: this.gift(),
      },
      []
    );
  }
}
