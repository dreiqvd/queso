import { STRING_TYPE } from '@angular/compiler';
import { Inject, inject, Injectable } from '@angular/core';
import {
  addDoc,
  collection,
  CollectionReference,
  collectionSnapshots,
  deleteDoc,
  doc,
  Firestore,
  updateDoc,
  WithFieldValue,
  writeBatch,
} from '@angular/fire/firestore';
import { from, map, Observable, of, switchMap } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export abstract class QsFirestoreBaseService<T> {
  protected readonly firestore = inject(Firestore);

  // eslint-disable-next-line @angular-eslint/prefer-inject
  constructor(@Inject(STRING_TYPE) protected resource: string) {}

  /**
   * Returns a collection or list of data.
   * @todo Add pagination, filtering, and sorting
   * @todo Add error handling
   */
  public list(): Observable<T[]> {
    const collection$ = collection(
      this.firestore,
      this.resource
    ) as CollectionReference<T>;

    return collectionSnapshots(collection$).pipe(
      map((res) => {
        return res.map((d) => {
          const id = d.id;
          const docData = d.data();
          return { ...docData, id };
        });
      })
    );
  }

  /**
   * Create a record.
   * @todo Add error handling
   */
  public create(payload: Partial<T>): Observable<{ data: Partial<T> }> {
    const collection$ = collection(
      this.firestore,
      this.resource
    ) as CollectionReference<T>;
    return from(addDoc(collection$, payload as WithFieldValue<T>)).pipe(
      switchMap(() => of({ data: payload }))
    );
  }

  /**
   * Update a record based on id.
   * @todo Add error handling
   */
  public update(
    id: string,
    payload: Partial<T>
  ): Observable<{ data: Partial<T> }> {
    const resourceRef = doc(this.firestore, this.resource, id);
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return from(updateDoc(resourceRef, payload as any)).pipe(
      switchMap(() => of({ data: payload }))
    );
  }

  /**
   * Delete a record based on id.
   * @todo Add error handling
   */
  public delete(id: string): Observable<{ message: string; id: string }> {
    const resourceRef = doc(this.firestore, this.resource, id);
    return from(deleteDoc(resourceRef)).pipe(() => {
      return of({ message: 'Success', id });
    });
  }

  /**
   * Bulk update records based on ids.
   * @todo Add error handling
   */
  public bulkUpdate(
    ids: string[],
    payload: Partial<T>
  ): Observable<{ message: string; ids: string[] }> {
    const batch = writeBatch(this.firestore);

    ids.forEach((id) => {
      const docRef = doc(this.firestore, `${this.resource}/${id}`);
      batch.update(docRef, payload);
    });

    return from(batch.commit()).pipe(
      switchMap(() => {
        return of({ message: 'Success', ids });
      })
    );
  }
}
