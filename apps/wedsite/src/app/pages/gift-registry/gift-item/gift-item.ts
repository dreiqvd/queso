import { CurrencyPipe } from '@angular/common';
import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { RegistryGift } from '../../../models/GiftRegistry';

@Component({
  selector: 'app-gift-item',
  imports: [CurrencyPipe, MatButtonModule],
  templateUrl: './gift-item.html',
})
export class GiftItem {
  readonly gift = input.required<RegistryGift>();

  openGift(): void {
    console.log(this.gift());
  }
}
