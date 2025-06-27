import { RegistryGift } from '../../models/GiftRegistry';

const WAFFLE_MAKER: RegistryGift = {
  id: '1',
  name: 'Waffle Maker',
  img: 'waffle',
  minPrice: 5800,
  maxPrice: 6500,
  details: `
    <h4 class="text-accent m-0 mb-2 font-medium text-lg">
      Cuisinart Vertical Waffle Maker
    </h4>
    <p>We found some spots you can snag this gift—feel free to take your pick!</p>
    <ul>
      <li>
        <a href="#" target="_blank" rel="noopener noreferrer">Cuisinart PH (Official)</a>
      </li>
      <li>
        <a href="#" target="_blank" rel="noopener noreferrer">Ansons PH</a>
      </li>
      <li>
        <a href="#" target="_blank" rel="noopener noreferrer">Lazada</a>
      </li>
    </ul>
  `,
};

const TOASTER: RegistryGift = {
  id: '2',
  name: 'Toaster',
  img: 'toaster',
  minPrice: 1500,
  maxPrice: 2000,
  details: '<p>TBD</p>',
};

const PILLOWS: RegistryGift = {
  id: '3',
  name: 'Pillows',
  img: 'pillows',
  minPrice: 800,
  maxPrice: 1200,
  details: '<p>TBD</p>',
};

const BEDSHEETS: RegistryGift = {
  id: '4',
  name: 'Bedsheet(s)',
  img: 'bedsheet',
  minPrice: 800,
  maxPrice: 1200,
  details: '<p>TBD</p>',
};

const BLANKETS: RegistryGift = {
  id: '5',
  name: 'Blanket(s)',
  img: 'blanket',
  minPrice: 800,
  maxPrice: 1200,
  details: '<p>TBD</p>',
};

const CCTV: RegistryGift = {
  id: '6',
  name: 'CCTV',
  img: 'cctv',
  minPrice: 800,
  maxPrice: 1200,
  details: '<p>TBD</p>',
};

const PS5_MEMORY_CARD: RegistryGift = {
  id: '7',
  name: 'PS5 Memory Card',
  img: 'memory-card',
  minPrice: 800,
  maxPrice: 1200,
  details: '<p>TBD</p>',
};

const PRINTER: RegistryGift = {
  id: '8',
  name: 'Printer',
  img: 'printer',
  minPrice: 800,
  maxPrice: 1200,
  details: '<p>TBD</p>',
};

const HUMIDIFIER: RegistryGift = {
  id: '9',
  name: 'Humidifier',
  img: 'humidifier',
  minPrice: 800,
  maxPrice: 1200,
  details: '<p>TBD</p>',
};

const RUGS: RegistryGift = {
  id: '10',
  name: 'Rug(s)',
  img: 'mat',
  minPrice: 800,
  maxPrice: 1200,
  details: '<p>TBD</p>',
};

const CASH: RegistryGift = {
  id: '11',
  name: 'Cash',
  img: 'cash',
  details: '<p>TBD</p>',
};

export const GIFT_REGISTRY_ITEMS: RegistryGift[] = [
  WAFFLE_MAKER,
  TOASTER,
  PILLOWS,
  BEDSHEETS,
  BLANKETS,
  CCTV,
  PS5_MEMORY_CARD,
  PRINTER,
  HUMIDIFIER,
  RUGS,
  CASH,
];
