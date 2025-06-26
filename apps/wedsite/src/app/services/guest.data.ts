import { GuestParty } from '../models/Guest';

export const GuestParty1: GuestParty = {
  id: '1',
  inviteCode: 'INVITE123',
  partyName: 'Jane and John Doe',
  members: ['John Doe', 'Jane Doe'],
  seats: 2,
};

export const GuestParty2: GuestParty = {
  id: '2',
  inviteCode: 'INVITE456',
  partyName: 'Bob and Alice Smith',
  members: ['Bob Smith', 'John Smith'],
  seats: 2,
};

export const GuestParty3: GuestParty = {
  id: '3',
  inviteCode: 'INVITE789',
  partyName: 'Alice and Bob Johnson',
  members: ['Alice Johnson', 'Bob Johnson'],
  seats: 2,
};

export const GuestParty4: GuestParty = {
  id: '4',
  inviteCode: 'INVITE101',
  partyName: 'Charlie Brown, Lucy Doe',
  members: ['Charlie Brown', 'Lucy Doe'],
  seats: 2,
};

export const GUEST_PARTIES: GuestParty[] = [
  GuestParty1,
  GuestParty2,
  GuestParty3,
  GuestParty4,
];
