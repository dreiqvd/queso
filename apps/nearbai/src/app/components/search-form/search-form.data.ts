import { SelectableItem } from '@queso/ui-kit';

import { Origin } from '../../app.interface';

export const ORIGINS: Origin[] = [
  {
    label: 'Matina Town Square',
    value: 'mts',
    position: {
      lat: 7.0636869,
      lng: 125.5916553,
    },
  },
  {
    label: 'SM City Davao',
    value: 'sm-city-davao',
    position: {
      lat: 7.0496822,
      lng: 125.5857307,
    },
  },
];

export const CATEGORIES: SelectableItem[] = [
  {
    label: 'Restaurants',
    value: 'restaurant',
  },
  {
    label: 'Drugstores',
    value: 'drugstore',
  },
];

export const RADIUS: SelectableItem[] = [
  {
    label: '500',
    value: 500,
  },
  {
    label: '1000',
    value: 1000,
  },
  {
    label: '1500',
    value: 1500,
  },
  {
    label: '2000',
    value: 2000,
  },
];

export const DEFAULTS = {
  origin: 'mts',
  category: 'restaurant',
  radius: 500,
};
