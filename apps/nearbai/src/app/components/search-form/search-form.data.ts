import { SelectableItem } from '@queso/ui-kit';

export const ORIGINS: SelectableItem[] = [
  {
    label: 'Current Location',
    value: 'current',
  },
  {
    label: 'SM Davao City',
    value: 'sm-davao',
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
