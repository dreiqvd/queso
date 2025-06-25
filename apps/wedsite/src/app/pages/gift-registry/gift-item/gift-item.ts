import { Component, input } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { RegistryGift } from '../gift-registry-page';

@Component({
  selector: 'app-gift-item',
  imports: [MatButtonModule],
  templateUrl: './gift-item.html',
})
export class GiftItem {
  readonly gift = input.required<RegistryGift>();
}
