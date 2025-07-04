/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThemePalette } from '@angular/material/core';
import { MatDialogConfig } from '@angular/material/dialog';
import { BehaviorSubject, Observable } from 'rxjs';

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
  content: QsDialogMessageProps | QsDialogProps;
  actions?: QsDialogAction[] | null;
}

export interface QsDialogMessageProps {
  type: 'message';
  message: string;
}

export interface QsDialogProps {
  type: 'component';
  component: any;
  props: any; // extra properties to be passed to the component
}

export interface QsDialogAction {
  label: string;
  type: (typeof QsDialogActionTypes)[keyof typeof QsDialogActionTypes];
  data?: any;
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
