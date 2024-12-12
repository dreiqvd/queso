/* eslint-disable @typescript-eslint/no-explicit-any */
import { MatDialogRef } from '@angular/material/dialog';
import { Observable, Subscriber } from 'rxjs';

export class DialogHandler<T> extends Observable<any> {
  public closed$!: Subscriber<any>;

  constructor(public dialogRef: MatDialogRef<T>) {
    super((subscriber) => (this.closed$ = subscriber));
    this.dialogRef.afterClosed().subscribe((result) => {
      if (this.closed$ && result?.data !== undefined) {
        this.closed$.next(result.data);
        this.closed$.complete();
      }
    });
  }
}
