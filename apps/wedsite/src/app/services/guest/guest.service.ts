import { Injectable } from '@angular/core';
import { delay, Observable, of } from 'rxjs';

import { GuestGroup } from '../../models/Guest';

import { GUEST_PARTIES } from './guest.data';

@Injectable({
  providedIn: 'root',
})
export class GuestService {
  findGuest(param: string): Observable<GuestGroup | null> {
    // Search by invite code or member name
    return of(
      GUEST_PARTIES.find((g) => {
        return g.inviteCode.toLowerCase() === param;
      }) ?? null
    ).pipe(delay(1000));
  }

  sendRsvp(guestGroup: GuestGroup): Observable<{ guestGroup: GuestGroup }> {
    // return throwError(() => new Error('Invalid party ID or response'));
    return of({ guestGroup }).pipe(delay(1000));
  }
}

/**
Code snippet for searching by invite code and members

import { getFirestore, collection, query, where, getDocs } from "firebase/firestore";

const db = getFirestore();

async function searchGuestParties(inviteCode: string, memberId: string) {
  const guestGroupRef = collection(db, "guestParties");

  const inviteCodeQuery = query(guestGroupRef, where("inviteCode", "==", inviteCode));
  const membersQuery = query(guestGroupRef, where("members", "array-contains", memberId));

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
