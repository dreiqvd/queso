import { GuestParty } from '../models/Guest';

export const GuestParty1: GuestParty = {
  id: '1',
  inviteCode: 'INVITE123',
  members: ['John Doe', 'Jane Doe'],
};

export const GuestParty2: GuestParty = {
  id: '2',
  inviteCode: 'INVITE456',
  members: ['Bob Smith', 'John Smith'],
};

export const GuestParty3: GuestParty = {
  id: '3',
  inviteCode: 'INVITE789',
  members: ['Alice Johnson', 'Bob Johnson'],
};

export const GuestParty4: GuestParty = {
  id: '4',
  inviteCode: 'INVITE101',
  members: ['Charlie Brown', 'Lucy Doe'],
};

export const GUEST_PARTIES: GuestParty[] = [
  GuestParty1,
  GuestParty2,
  GuestParty3,
  GuestParty4,
];
