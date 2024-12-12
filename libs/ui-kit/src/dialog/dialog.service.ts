/* eslint-disable @typescript-eslint/no-explicit-any */
import { Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { DialogComponent } from './dialog.component';
import { DialogHandler } from './dialog.handler';
import { DIALOG_BUTTONS, DialogData } from './dialog.interface';

@Injectable({
  providedIn: 'root',
})
export class DialogService {
  constructor(public dialog: MatDialog) {}

  /** Display a simple dialog message */
  showMessage(
    title: string,
    message: string,
    dialogOptions?: MatDialogConfig
  ): DialogHandler<DialogComponent> {
    const data: DialogData = {
      title,
      content: { type: 'message', message },
      actions: [DIALOG_BUTTONS.CLOSE],
    };

    return new DialogHandler(
      this.dialog.open(DialogComponent, {
        data,
        disableClose: true,
        ...dialogOptions,
      })
    );
  }

  /** Display a dialog with custom component as content */
  showCustomComponent(
    title: string,
    component: any,
    props: any,
    actions?: DialogData['actions'],
    dialogOptions?: MatDialogConfig
  ): DialogHandler<DialogComponent> {
    if (!actions) {
      actions = [DIALOG_BUTTONS.CANCEL, DIALOG_BUTTONS.SUBMIT];
    }
    const data: DialogData = {
      title,
      content: { type: 'component', component, props },
      actions,
    };

    return new DialogHandler(
      this.dialog.open(DialogComponent, {
        data,
        disableClose: true,
        ...dialogOptions,
      })
    );
  }
}
