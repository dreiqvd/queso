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
  category: 'restaurant',
  radius: 500,
};

export const data = [
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 7.0506461,
        lng: 125.5883781,
      },
      viewport: {
        south: 7.049333519708497,
        west: 125.5870171197085,
        north: 7.052031480291502,
        east: 125.5897150802915,
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: "Shakey's Pizza Parlor",
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 4224,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/104684721303383250781">Ralph James Laman</a>',
        ],
        width: 3136,
      },
    ],
    place_id: 'ChIJszgeYb1y-TIRwywGpeqIvhc',
    plus_code: {
      compound_code: '3H2Q+79 Davao City, Davao del Sur, Philippines',
      global_code: '6QV73H2Q+79',
    },
    price_level: 2,
    rating: 4.2,
    reference: 'ChIJszgeYb1y-TIRwywGpeqIvhc',
    scope: 'GOOGLE',
    types: ['restaurant', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 118,
    vicinity: 'Quimpo corner Tulip Drive, Davao City',
    html_attributions: [],
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 7.0501051,
        lng: 125.5871844,
      },
      viewport: {
        south: 7.048723919708497,
        west: 125.5857330197085,
        north: 7.051421880291501,
        east: 125.5884309802915,
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: "Dencio's Kamayan - SM Ecoland",
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 3472,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/108481750974959163821">Julius Angot (Travelistahan)</a>',
        ],
        width: 4640,
      },
    ],
    place_id: 'ChIJszgeYb1y-TIRrM9DisQg_VQ',
    plus_code: {
      compound_code: '3H2P+2V Davao City, Davao del Sur, Philippines',
      global_code: '6QV73H2P+2V',
    },
    price_level: 2,
    rating: 4.2,
    reference: 'ChIJszgeYb1y-TIRrM9DisQg_VQ',
    scope: 'GOOGLE',
    types: ['restaurant', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 48,
    vicinity: 'SM Building, Ecoland, Davao City',
    html_attributions: [],
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 7.050459099999999,
        lng: 125.5878373,
      },
      viewport: {
        south: 7.049151769708497,
        west: 125.5864746197085,
        north: 7.051849730291502,
        east: 125.5891725802915,
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: 'Pizza Hut',
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 402,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/117368729401603222995">Pizza Hut</a>',
        ],
        width: 567,
      },
    ],
    place_id: 'ChIJmc-kx5dy-TIRF8NKx-uUUVs',
    plus_code: {
      compound_code: '3H2Q+54 Davao City, Davao del Sur, Philippines',
      global_code: '6QV73H2Q+54',
    },
    price_level: 2,
    rating: 3.2,
    reference: 'ChIJmc-kx5dy-TIRF8NKx-uUUVs',
    scope: 'GOOGLE',
    types: ['restaurant', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 43,
    vicinity:
      'Pizza Hut SM Davao, Space No. 111-112, G/F SM City Davao, Quimpo Blvd., Brgy. Matina, Brgy Matina',
    html_attributions: [],
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 7.0506106,
        lng: 125.5885446,
      },
      viewport: {
        south: 7.049338469708499,
        west: 125.5871703197085,
        north: 7.052036430291503,
        east: 125.5898682802915,
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: 'Goldilocks - SM City Davao',
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 4032,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/104216868208723259085">Berlie Faith</a>',
        ],
        width: 3024,
      },
    ],
    place_id: 'ChIJfT6H0Jdy-TIRqfYdtkLDDv8',
    plus_code: {
      compound_code: '3H2Q+6C Davao City, Davao del Sur, Philippines',
      global_code: '6QV73H2Q+6C',
    },
    price_level: 2,
    rating: 4,
    reference: 'ChIJfT6H0Jdy-TIRqfYdtkLDDv8',
    scope: 'GOOGLE',
    types: [
      'bakery',
      'restaurant',
      'food',
      'point_of_interest',
      'store',
      'establishment',
    ],
    user_ratings_total: 11,
    vicinity: 'SM City Davao, Quimpo Boulevard, Talomo, Davao City',
    html_attributions: [],
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 7.050336100000001,
        lng: 125.5878335,
      },
      viewport: {
        south: 7.049083769708498,
        west: 125.5864526697085,
        north: 7.051781730291503,
        east: 125.5891506302915,
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: 'KeRRimo',
    opening_hours: {
      open_now: false,
    },
    place_id: 'ChIJc7Ep35dy-TIRdOq9LTJKb28',
    plus_code: {
      compound_code: '3H2Q+44 Davao City, Davao del Sur, Philippines',
      global_code: '6QV73H2Q+44',
    },
    reference: 'ChIJc7Ep35dy-TIRdOq9LTJKb28',
    scope: 'GOOGLE',
    types: [
      'meal_takeaway',
      'restaurant',
      'food',
      'point_of_interest',
      'establishment',
    ],
    vicinity: 'SM CITY DAVAO Building, Quimpo Boulevard, Ecoland, Davao City',
    html_attributions: [],
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 7.0500981,
        lng: 125.5882675,
      },
      viewport: {
        south: 7.049016869708497,
        west: 125.5868303197085,
        north: 7.051714830291502,
        east: 125.5895282802915,
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: 'Porky Best',
    opening_hours: {
      open_now: false,
    },
    place_id: 'ChIJJf_n2pdy-TIRK6kyp-ADUUA',
    plus_code: {
      compound_code: '3H2Q+28 Davao City, Davao del Sur, Philippines',
      global_code: '6QV73H2Q+28',
    },
    rating: 4,
    reference: 'ChIJJf_n2pdy-TIRK6kyp-ADUUA',
    scope: 'GOOGLE',
    types: [
      'meal_takeaway',
      'restaurant',
      'food',
      'point_of_interest',
      'establishment',
    ],
    user_ratings_total: 8,
    vicinity:
      'Sm Super Market, Sm City Davao Building, Quimpo Boulevard, Ecoland, Davao City',
    html_attributions: [],
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 7.049489999999999,
        lng: 125.588308,
      },
      viewport: {
        south: 7.047859219708497,
        west: 125.5870511697085,
        north: 7.050557180291502,
        east: 125.5897491302915,
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: 'Mang Inasal',
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 4000,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/111351449283519718987">Melissa Weber</a>',
        ],
        width: 2252,
      },
    ],
    place_id: 'ChIJoWCGLZZy-TIR5wGBqz1NELg',
    plus_code: {
      compound_code: '2HXQ+Q8 Davao City, Davao del Sur, Philippines',
      global_code: '6QV72HXQ+Q8',
    },
    price_level: 1,
    rating: 4,
    reference: 'ChIJoWCGLZZy-TIR5wGBqz1NELg',
    scope: 'GOOGLE',
    types: ['restaurant', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 220,
    vicinity: 'SM City Mall, 2nd Floor, Quimpo Boulevard, Ecoland, Davao City',
    html_attributions: [],
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 7.0504541,
        lng: 125.5884389,
      },
      viewport: {
        south: 7.049237169708498,
        west: 125.5870464197085,
        north: 7.051935130291501,
        east: 125.5897443802915,
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/cafe-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/cafe_pinlet',
    name: 'Mandarin TEA GARDEN',
    photos: [
      {
        height: 2736,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/115404033015076467025">Nida felix</a>',
        ],
        width: 3648,
      },
    ],
    place_id: 'ChIJ185p0Zdy-TIRVqGk06pHDJ4',
    plus_code: {
      compound_code: '3H2Q+59 Davao City, Davao del Sur, Philippines',
      global_code: '6QV73H2Q+59',
    },
    rating: 3.6,
    reference: 'ChIJ185p0Zdy-TIRVqGk06pHDJ4',
    scope: 'GOOGLE',
    types: ['cafe', 'restaurant', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 8,
    vicinity: '76 Quimpo Boulevard, Talomo, Davao City',
    html_attributions: [],
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 7.050605999999998,
        lng: 125.5882563,
      },
      viewport: {
        south: 7.049293669708497,
        west: 125.5868952197085,
        north: 7.051991630291502,
        east: 125.5895931802915,
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: 'Tokyo Tokyo Philippines',
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 2880,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/116744691380805560544">Jade Talingting</a>',
        ],
        width: 2304,
      },
    ],
    place_id: 'ChIJEcom3Zdy-TIRkmekL4GxyVE',
    plus_code: {
      compound_code: '3H2Q+68 Davao City, Davao del Sur, Philippines',
      global_code: '6QV73H2Q+68',
    },
    price_level: 2,
    rating: 3.9,
    reference: 'ChIJEcom3Zdy-TIRkmekL4GxyVE',
    scope: 'GOOGLE',
    types: ['restaurant', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 43,
    vicinity: 'G/F, SM City Davao, Ecoland Drive, Davao City',
    html_attributions: [],
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 7.049289,
        lng: 125.5886527,
      },
      viewport: {
        south: 7.047799369708497,
        west: 125.5873497197085,
        north: 7.050497330291502,
        east: 125.5900476802915,
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: 'Takuyaki',
    opening_hours: {
      open_now: false,
    },
    place_id: 'ChIJVVVlM5Zy-TIR7ICCUF7cyLU',
    plus_code: {
      compound_code: '2HXQ+PF Davao City, Davao del Sur, Philippines',
      global_code: '6QV72HXQ+PF',
    },
    reference: 'ChIJVVVlM5Zy-TIR7ICCUF7cyLU',
    scope: 'GOOGLE',
    types: [
      'meal_takeaway',
      'restaurant',
      'food',
      'point_of_interest',
      'establishment',
    ],
    vicinity: 'SM CITY DAVAO Building, Quimpo Boulevard, Ecoland, Davao City',
    html_attributions: [],
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 7.050302299999998,
        lng: 125.5823973,
      },
      viewport: {
        south: 7.049039469708496,
        west: 125.5811451697085,
        north: 7.0517374302915,
        east: 125.5838431302915,
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/gas_station-71.png',
    icon_background_color: '#909CE1',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/gas_pinlet',
    name: 'Shell',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 2340,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/115562853455970494772">Jehuda Ish-Shalom</a>',
        ],
        width: 4160,
      },
    ],
    place_id: 'ChIJv3oEgbxy-TIReaclG0jIMVI',
    plus_code: {
      compound_code: '3H2J+4X Davao City, Davao del Sur, Philippines',
      global_code: '6QV73H2J+4X',
    },
    price_level: 2,
    rating: 3.7,
    reference: 'ChIJv3oEgbxy-TIReaclG0jIMVI',
    scope: 'GOOGLE',
    types: [
      'gas_station',
      'car_wash',
      'convenience_store',
      'car_repair',
      'meal_takeaway',
      'restaurant',
      'food',
      'point_of_interest',
      'store',
      'establishment',
    ],
    user_ratings_total: 26,
    vicinity: 'Quimpo Boulevard, Ecoland, Davao City',
    html_attributions: [],
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 7.050036599999999,
        lng: 125.5891592,
      },
      viewport: {
        south: 7.048668269708498,
        west: 125.5877512697085,
        north: 7.051366230291502,
        east: 125.5904492302915,
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: 'Tong Yang, SM City Davao Ecoland',
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 6000,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/100376689542228288115">Nolie Boy Omandam</a>',
        ],
        width: 8000,
      },
    ],
    place_id: 'ChIJAQAAu5dy-TIRaGoJFT5WyU4',
    plus_code: {
      compound_code: '3H2Q+2M Davao City, Davao del Sur, Philippines',
      global_code: '6QV73H2Q+2M',
    },
    price_level: 2,
    rating: 4.8,
    reference: 'ChIJAQAAu5dy-TIRaGoJFT5WyU4',
    scope: 'GOOGLE',
    types: ['restaurant', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 3170,
    vicinity: 'SM City Davao Annex, Quimpo Boulevard, Davao City',
    html_attributions: [],
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 7.049377799999999,
        lng: 125.5892346,
      },
      viewport: {
        south: 7.048022919708498,
        west: 125.5878674697085,
        north: 7.050720880291503,
        east: 125.5905654302915,
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: 'Potato Corner',
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 2190,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/109825821710655030499">Teemu Väisänen</a>',
        ],
        width: 3666,
      },
    ],
    place_id: 'ChIJF6LQtJdy-TIRNWrHjX3B8hw',
    plus_code: {
      compound_code: '2HXQ+QM Davao City, Davao del Sur, Philippines',
      global_code: '6QV72HXQ+QM',
    },
    rating: 3.5,
    reference: 'ChIJF6LQtJdy-TIRNWrHjX3B8hw',
    scope: 'GOOGLE',
    types: [
      'meal_takeaway',
      'restaurant',
      'food',
      'point_of_interest',
      'establishment',
    ],
    user_ratings_total: 11,
    vicinity: 'Sm City Davao Building, Quimpo Boulevard, Ecoland, Davao City',
    html_attributions: [],
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 7.049799399999999,
        lng: 125.5875741,
      },
      viewport: {
        south: 7.048376469708497,
        west: 125.5859900197085,
        north: 7.051074430291502,
        east: 125.5886879802915,
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: 'KFC',
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 2268,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/110213753277952493306">Joshep Tiburcio</a>',
        ],
        width: 4032,
      },
    ],
    place_id: 'ChIJszgeYb1y-TIR_KyPZRTZk4g',
    plus_code: {
      compound_code: '2HXQ+W2 Davao City, Davao del Sur, Philippines',
      global_code: '6QV72HXQ+W2',
    },
    price_level: 1,
    rating: 4,
    reference: 'ChIJszgeYb1y-TIR_KyPZRTZk4g',
    scope: 'GOOGLE',
    types: [
      'meal_takeaway',
      'restaurant',
      'food',
      'point_of_interest',
      'establishment',
    ],
    user_ratings_total: 185,
    vicinity:
      'Unit 103 105, SM City Davao Ecoland Drive, Quimpo Boulevard, Davao City',
    html_attributions: [],
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 7.0497028,
        lng: 125.5861295,
      },
      viewport: {
        south: 7.048361869708497,
        west: 125.5847461197085,
        north: 7.051059830291502,
        east: 125.5874440802915,
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: 'Hangry Tuna Davao Ecowest Branch',
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 3024,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/102957773858508224796">Dan Espinoza</a>',
        ],
        width: 4032,
      },
    ],
    place_id: 'ChIJbe61b4pz-TIRh7hl-Cb-O4s',
    plus_code: {
      compound_code: '2HXP+VF Davao City, Davao del Sur, Philippines',
      global_code: '6QV72HXP+VF',
    },
    reference: 'ChIJbe61b4pz-TIRh7hl-Cb-O4s',
    scope: 'GOOGLE',
    types: ['restaurant', 'food', 'point_of_interest', 'establishment'],
    vicinity:
      'BEP Prime Properties Ecowest Drive, Quimpo Boulevard, Ecoland, Davao City',
    html_attributions: [],
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 7.049778,
        lng: 125.5852047,
      },
      viewport: {
        south: 7.048481069708497,
        west: 125.5838359697085,
        north: 7.051179030291502,
        east: 125.5865339302915,
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: 'Prime Bistro',
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 3024,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/101493540639074207549">Tiffany Buzon</a>',
        ],
        width: 4032,
      },
    ],
    place_id: 'ChIJE__WLTNz-TIRzX0UZdDDozg',
    plus_code: {
      compound_code: '2HXP+W3 Davao City, Davao del Sur, Philippines',
      global_code: '6QV72HXP+W3',
    },
    rating: 4.4,
    reference: 'ChIJE__WLTNz-TIRzX0UZdDDozg',
    scope: 'GOOGLE',
    types: ['restaurant', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 33,
    vicinity:
      'Street Corner, Quimpo Boulevard, Eco West Drive, Ecoland, Davao City',
    html_attributions: [],
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 7.050211,
        lng: 125.5854739,
      },
      viewport: {
        south: 7.048799319708497,
        west: 125.5841448197085,
        north: 7.051497280291501,
        east: 125.5868427802915,
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: 'DabaWings',
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 4000,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/113002458632117733548">Omar Y</a>',
        ],
        width: 3000,
      },
    ],
    place_id: 'ChIJUWLG9j1z-TIRESUuZy8yihk',
    plus_code: {
      compound_code: '3H2P+35 Davao City, Davao del Sur, Philippines',
      global_code: '6QV73H2P+35',
    },
    rating: 4,
    reference: 'ChIJUWLG9j1z-TIRESUuZy8yihk',
    scope: 'GOOGLE',
    types: ['restaurant', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 47,
    vicinity: '166 Quimpo Boulevard, Talomo, Davao City',
    html_attributions: [],
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 7.049032599999999,
        lng: 125.5860123,
      },
      viewport: {
        south: 7.047798019708496,
        west: 125.5847867197085,
        north: 7.050495980291501,
        east: 125.5874846802915,
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: 'Casa Maria',
    place_id: 'ChIJ260o-5Vy-TIR4zQ5mN2PAfE',
    reference: 'ChIJ260o-5Vy-TIR4zQ5mN2PAfE',
    scope: 'GOOGLE',
    types: ['restaurant', 'food', 'point_of_interest', 'establishment'],
    vicinity: '2HXP+JC6, Eco West Drive, Talomo, Davao City',
    html_attributions: [],
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 7.0501727,
        lng: 125.5851137,
      },
      viewport: {
        south: 7.048721619708498,
        west: 125.5838101197085,
        north: 7.051419580291503,
        east: 125.5865080802915,
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/gas_station-71.png',
    icon_background_color: '#909CE1',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/gas_pinlet',
    name: 'Shell',
    opening_hours: {
      open_now: true,
    },
    photos: [
      {
        height: 4032,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/118124412667159928274">Dheon Mark (Prokopio)</a>',
        ],
        width: 3024,
      },
    ],
    place_id: 'ChIJmZK2g7xy-TIRER7zAjZVZs4',
    plus_code: {
      compound_code: '3H2P+32 Davao City, Davao del Sur, Philippines',
      global_code: '6QV73H2P+32',
    },
    price_level: 2,
    rating: 4.4,
    reference: 'ChIJmZK2g7xy-TIRER7zAjZVZs4',
    scope: 'GOOGLE',
    types: [
      'gas_station',
      'convenience_store',
      'cafe',
      'car_repair',
      'meal_takeaway',
      'restaurant',
      'food',
      'point_of_interest',
      'store',
      'establishment',
    ],
    user_ratings_total: 16,
    vicinity: 'Quimpo Boulevard, Matina, Davao City',
    html_attributions: [],
  },
  {
    business_status: 'OPERATIONAL',
    geometry: {
      location: {
        lat: 7.049049,
        lng: 125.5862218,
      },
      viewport: {
        south: 7.047758769708498,
        west: 125.5849361697085,
        north: 7.050456730291502,
        east: 125.5876341302915,
      },
    },
    icon: 'https://maps.gstatic.com/mapfiles/place_api/icons/v1/png_71/restaurant-71.png',
    icon_background_color: '#FF9E67',
    icon_mask_base_uri:
      'https://maps.gstatic.com/mapfiles/place_api/icons/v2/restaurant_pinlet',
    name: "Tatang's Halo Halo",
    opening_hours: {
      open_now: false,
    },
    photos: [
      {
        height: 3968,
        html_attributions: [
          '<a href="https://maps.google.com/maps/contrib/105799342039463567355">Mi Ming</a>',
        ],
        width: 2976,
      },
    ],
    place_id: 'ChIJw2y1or1y-TIRtA1Z_NlojMM',
    plus_code: {
      compound_code: '2HXP+JF Davao City, Davao del Sur, Philippines',
      global_code: '6QV72HXP+JF',
    },
    rating: 3.9,
    reference: 'ChIJw2y1or1y-TIRtA1Z_NlojMM',
    scope: 'GOOGLE',
    types: ['restaurant', 'food', 'point_of_interest', 'establishment'],
    user_ratings_total: 9,
    vicinity: 'CJ Building, Eco West Drive, Ecoland Subdivision, Davao City',
    html_attributions: [],
  },
];
