import { QsSelectableItem } from '@queso/ui-kit';

import { Origin } from '../../common/interfaces';

export const ORIGINS: Origin[] = [
  {
    label: "People's Park Davao",
    value: 'peoples-park',
    position: {
      lat: 7.070777695265054,
      lng: 125.60867067842437,
    },
  },
  {
    label: 'Ateneo de Davao University',
    value: 'addu',
    position: {
      lat: 7.071167398015365,
      lng: 125.61358949332146,
    },
  },
  {
    label: 'Azuela Cove',
    value: 'azuela',
    position: {
      lat: 7.070412881346263,
      lng: 125.61159518962047,
    },
  },
  {
    label: 'Bangko Sentral ng Pilipinas',
    value: 'bsp',
    position: {
      lat: 7.076204935309005,
      lng: 125.6097924368245,
    },
  },
  {
    label: 'Centerpoint Plaza Matina',
    value: 'centerpoint',
    position: {
      lat: 7.058892395783327,
      lng: 125.56933414052192,
    },
  },
  {
    label: 'Central Park Bangkal',
    value: 'central-park',
    position: {
      lat: 7.057101006456863,
      lng: 125.55375717602433,
    },
  },
  {
    label: 'Gaisano Mall Bajada',
    value: 'gmall-bajada',
    position: {
      lat: 7.078041410066352,
      lng: 125.61366591013572,
    },
  },
  {
    label: 'Gaisano Mall Toril',
    value: 'gmall-toril',
    position: {
      lat: 7.016936948164309,
      lng: 125.4935699585737,
    },
  },
  {
    label: 'Matina Town Square (MTS)',
    value: 'mts',
    position: {
      lat: 7.063806677379083,
      lng: 125.5967766430919,
    },
  },
  {
    label: 'Ramon Magsaysay Park',
    value: 'magsaysay-park',
    position: {
      lat: 7.074639824663686,
      lng: 125.62553299449563,
    },
  },
  {
    label: 'San Pedro Cathedral',
    value: 'san-pedro-cathedral',
    position: {
      lat: 7.064708637109092,
      lng: 125.60919884288703,
    },
  },
  {
    label: 'SM City Davao',
    value: 'sm-city-davao',
    position: {
      lat: 7.049745099391816,
      lng: 125.58831516534087,
    },
  },
  {
    label: 'Sta. Ana Shrine Parish',
    value: 'sta-ana',
    position: {
      lat: 7.077002875911421,
      lng: 125.61728918182523,
    },
  },
  {
    label: 'UIC',
    value: 'uic',
    position: {
      lat: 7.101424542484615,
      lng: 125.62185222462702,
    },
  },
  {
    label: 'Victoria Plaza',
    value: 'victoria',
    position: {
      lat: 7.085861309474852,
      lng: 125.61141298960916,
    },
  },
];

export const CATEGORIES: QsSelectableItem[] = [
  {
    label: 'Restaurants',
    value: 'restaurant',
  },
  {
    label: 'ATMs',
    value: 'atm',
  },
  {
    label: 'Amusement Parks',
    value: 'amusement_park',
  },
  {
    label: 'Bakery',
    value: 'bakery',
  },
  {
    label: 'Banks',
    value: 'bank',
  },
  {
    label: 'Bar',
    value: 'bar',
  },
  {
    label: 'Beauty Salons',
    value: 'beauty_salon',
  },
  {
    label: 'Book Stores',
    value: 'book_store',
  },
  {
    label: 'Cafes',
    value: 'cafe',
  },
  {
    label: 'Car Rentals',
    value: 'car_rental',
  },
  {
    label: 'Car Wash',
    value: 'car_wash',
  },
  {
    label: 'Churches',
    value: 'church',
  },
  {
    label: 'Convenience Stores',
    value: 'convenience_store',
  },
  {
    label: 'Dentists',
    value: 'dentist',
  },
  {
    label: 'Drugstores',
    value: 'drugstore',
  },
  {
    label: 'Fire Stations',
    value: 'fire_station',
  },
  {
    label: 'Gas Stations',
    value: 'gas_station',
  },
  {
    label: 'Gyms',
    value: 'gym',
  },
  {
    label: 'Hospitals',
    value: 'hospital',
  },
  {
    label: 'Hotels/Lodging',
    value: 'lodging',
  },
  {
    label: 'Laundry Shops',
    value: 'laundry',
  },
  {
    label: 'Pet Stores',
    value: 'pet_store',
  },
  {
    label: 'Pharmacies',
    value: 'pharmacy',
  },
  {
    label: 'Police Stations',
    value: 'police',
  },
  {
    label: 'Schools',
    value: 'school',
  },
  {
    label: 'Spa',
    value: 'spa',
  },
  {
    label: 'Supermarkets',
    value: 'supermarket',
  },
  {
    label: 'Veterinary Clinics',
    value: 'veterinary_care',
  },
];

export const RADIUS: QsSelectableItem[] = [
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
  origin: 'peoples-park',
  category: 'restaurant',
  radius: 500,
};
