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
];

export const CATEGORIES: SelectableItem[] = [
  {
    label: 'Restaurants',
    value: 'restaurants',
  },
  {
    label: 'Veterinary Clinics',
    value: 'veterinary-clinics',
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
  category: 'restaurants',
  radius: 500,
};
