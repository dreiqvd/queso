import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

import { GuestParty } from '../models/Guest';

import { GUEST_PARTIES } from './guest.data';

@Injectable({
  providedIn: 'root',
})
export class GuestService {
  findGuest(param: string): Observable<GuestParty[] | null> {
    // Search by invite code or member name
    return of(
      GUEST_PARTIES.filter((g) => {
        return (
          g.inviteCode === param ||
          g.members.some((m) => m.toLowerCase().includes(param))
        );
      }) ?? null
    ).pipe(delay(1000));
  }
}

/**
Code snippet for searching by invite code and members

import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const db = getFirestore();

async function searchGuestParties(inviteCode: string, memberId: string) {
  const guestPartyRef = collection(db, "guestParties");

  const inviteCodeQuery = query(guestPartyRef, where("inviteCode", "==", inviteCode));
  const membersQuery = query(guestPartyRef, where("members", "array-contains", memberId));

  const [inviteCodeSnap, membersSnap] = await Promise.all([
    getDocs(inviteCodeQuery),
    getDocs(membersQuery),
  ]);

  const resultMap = new Map();

  inviteCodeSnap.docs.forEach(doc => resultMap.set(doc.id, { id: doc.id, ...doc.data() }));
  membersSnap.docs.forEach(doc => resultMap.set(doc.id, { id: doc.id, ...doc.data() }));

  return Array.from(resultMap.values());
}
 */
