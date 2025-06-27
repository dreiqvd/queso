import { GuestGroup } from '../models/Guest';

export const GuestGroup1: GuestGroup = {
  id: '1',
  inviteCode: 'DOE',
  members: [
    { name: 'John Doe', attending: false },
    { name: 'Jane Doe', attending: false },
    { name: 'Marry Grace Doe', attending: false },
    { name: 'Jerry Doe', attending: false },
  ],
  seats: 4,
};

export const GuestGroup2: GuestGroup = {
  id: '2',
  inviteCode: 'SMITH',
  members: [
    { name: 'Bob Smith', attending: false },
    { name: 'John Smith', attending: false },
  ],
  seats: 2,
};

export const GuestGroup3: GuestGroup = {
  id: '3',
  inviteCode: 'JOHNSON',
  members: [
    { name: 'Alice Johnson', attending: false },
    { name: 'Bob Johnson', attending: false },
  ],
  seats: 2,
};

export const GuestGroup4: GuestGroup = {
  id: '4',
  inviteCode: 'BROWN',
  members: [
    { name: 'Charlie Brown', attending: false },
    { name: 'Lucy Doe', attending: false },
  ],
  seats: 2,
};

export const SingleGroup: GuestGroup = {
  id: '5',
  inviteCode: 'SINGLE',
  members: [{ name: 'Magnus Carlsen', attending: false }],
  seats: 1,
};

export const GUEST_PARTIES: GuestGroup[] = [
  GuestGroup1,
  GuestGroup2,
  GuestGroup3,
  GuestGroup4,
  SingleGroup,
];
