export interface Guest {
  name: string;
  attending: boolean;
}

export interface GuestGroup {
  id: string;
  inviteCode: string;
  members: Guest[];
  seats: number;
}
