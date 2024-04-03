import { SelectableItem } from '@queso/ui-kit';

export const ORIGINS: SelectableItem[] = [
  {
    label: 'Current Location',
    value: 'current',
  },
  {
    label: 'SM City Davao',
    value: 'sm-city-davao',
    position: {
      lat: 7.0496822,
      lng: 125.5857307,
    },
  },
  {
    label: 'Matina Town Square',
    value: 'mts',
    position: {
      lat: 7.0636869,
      lng: 125.5916553,
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
  origin: 'sm-city-davao',
  category: 'restaurant',
  radius: 500,
};
