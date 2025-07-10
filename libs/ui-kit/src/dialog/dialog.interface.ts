/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThemePalette } from '@angular/material/core';
import { MatDialogConfig, MatDialogRef } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';

import { QsDialog } from './dialog.component';

export const QsBaseDialogConfig: MatDialogConfig = {
  disableClose: true,
  autoFocus: false,
};

export const QsDialogActionTypes = {
  OK: 'OK', // used for form submissions and doing actions
  CANCEL: 'CANCEL',
} as const;

export interface QsDialogData {
  title: string;
  content: QsDialogMessageContent | QsDialogComponentContent;
  actions?: QsDialogAction[] | null;
}

export interface QsDialogMessageContent {
  type: 'message';
  message: string;
}

export interface QsDialogComponentContent {
  type: 'component';
  component: any;
  props: any; // extra properties to be passed to the component
}

/**
 * This abstract class contains the common properties when
 * a custom component is used in a dialog.
 */
export abstract class QsDialogComponent {
  dialogRef!: MatDialogRef<QsDialog>;
}

export interface IQsDialogComponent {
  dialogOkDisabled$?: BehaviorSubject<boolean>;
  dialogCloseHandler?: () => Observable<any>;
}

export interface QsDialogAction {
  label: string;
  type: (typeof QsDialogActionTypes)[keyof typeof QsDialogActionTypes];
  className?: string;
  color?: ThemePalette;
  disabled$?: BehaviorSubject<boolean>;
  closeHandler?: () => Observable<any>;
}

export const QS_DIALOG_BUTTONS = {
  CLOSE: { label: 'Close', type: QsDialogActionTypes.CANCEL },
  CANCEL: { label: 'Cancel', type: QsDialogActionTypes.CANCEL },
  SUBMIT: { label: 'Submit', type: QsDialogActionTypes.OK },
  CONFIRM: { label: 'Confirm', type: QsDialogActionTypes.OK },
};
