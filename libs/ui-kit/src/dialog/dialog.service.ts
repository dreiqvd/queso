/* eslint-disable @typescript-eslint/no-explicit-any */
import { inject, Injectable } from '@angular/core';
import { MatDialog, MatDialogConfig } from '@angular/material/dialog';

import { QsDialog } from './dialog.component';
import { QsDialogHandler } from './dialog.handler';
import {
  QS_DIALOG_BUTTONS,
  QsBaseDialogConfig,
  QsDialogData,
} from './dialog.interface';

@Injectable({
  providedIn: 'root',
})
export class QsDialogService {
  public readonly dialog = inject(MatDialog);

  /** Display a simple dialog message */
  showMessage(
    title: string,
    message: string,
    dialogOptions?: MatDialogConfig
  ): QsDialogHandler<QsDialog> {
    const data: QsDialogData = {
      title,
      content: { type: 'message', message },
      actions: [QS_DIALOG_BUTTONS.CLOSE],
    };

    return new QsDialogHandler(
      this.dialog.open(QsDialog, {
        data,
        ...QsBaseDialogConfig,
        ...dialogOptions,
      })
    );
  }

  /** Display a confirmation message dialog */
  showConfirmation(
    title: string,
    message: string,
    dialogOptions?: MatDialogConfig
  ): QsDialogHandler<QsDialog> {
    const data: QsDialogData = {
      title,
      content: { type: 'message', message },
      actions: [QS_DIALOG_BUTTONS.CANCEL, QS_DIALOG_BUTTONS.CONFIRM],
    };

    return new QsDialogHandler(
      this.dialog.open(QsDialog, {
        data,
        ...QsBaseDialogConfig,
        ...dialogOptions,
      })
    );
  }

  /** Display a dialog with custom component as content */
  showCustomComponent(
    title: string,
    component: any,
    props: any,
    actions?: QsDialogData['actions'],
    dialogOptions?: MatDialogConfig
  ): QsDialogHandler<QsDialog> {
    if (!actions) {
      actions = [QS_DIALOG_BUTTONS.CANCEL, QS_DIALOG_BUTTONS.SUBMIT];
    }
    const data: QsDialogData = {
      title,
      content: { type: 'component', component, props },
      actions,
    };

    return new QsDialogHandler(
      this.dialog.open(QsDialog, {
        data,
        ...QsBaseDialogConfig,
        ...dialogOptions,
      })
    );
  }
}
