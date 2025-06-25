import { Component } from '@angular/core';

import { GiftItem } from './gift-item/gift-item';

export interface RegistryGift {
  name: string;
  img: string;
  price: string; // string price
  details: string; // HTML string
}

@Component({
  selector: 'app-gift-registry-page',
  imports: [GiftItem],
  templateUrl: './gift-registry-page.html',
})
export class GiftRegistryPage {
  readonly gifts: RegistryGift[] = [
    {
      name: 'Waffle Maker',
      img: 'waffle',
      price: '₱2,500 - ₱3,500',
      details: '<p>TBD</p>',
    },
    {
      name: 'Toaster',
      img: 'toaster',
      price: '₱1,500 - ₱2,000',
      details: '<p>TBD</p>',
    },
    {
      name: 'Pillows',
      img: 'pillows',
      price: '₱800 - ₱1,200',
      details: '<p>TBD</p>',
    },
    {
      name: 'Bedsheet(s)',
      img: 'bedsheet',
      price: '₱800 - ₱1,200',
      details: '<p>TBD</p>',
    },
    {
      name: 'Blanket(s)',
      img: 'blanket',
      price: '₱800 - ₱1,200',
      details: '<p>TBD</p>',
    },
    {
      name: 'CCTV',
      img: 'cctv',
      price: '₱800 - ₱1,200',
      details: '<p>TBD</p>',
    },
    {
      name: 'PS5 Memory Card',
      img: 'memory-card',
      price: '₱800 - ₱1,200',
      details: '<p>TBD</p>',
    },
    {
      name: 'Printer',
      img: 'printer',
      price: '₱800 - ₱1,200',
      details: '<p>TBD</p>',
    },
    {
      name: 'Humidifier',
      img: 'humidifier',
      price: '₱800 - ₱1,200',
      details: '<p>TBD</p>',
    },
    {
      name: 'Rug(s)',
      img: 'mat',
      price: '₱800 - ₱1,200',
      details: '<p>TBD</p>',
    },
    {
      name: 'Cash',
      img: 'cash',
      price: '(any)',
      details: '<p>TBD</p>',
    },
  ];
}
