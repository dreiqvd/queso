/* eslint-disable @typescript-eslint/no-explicit-any */
import { ThemePalette } from '@angular/material/core';
import { BehaviorSubject, Observable } from 'rxjs';

export const DialogActionTypes = {
  OK: 'OK', // used for form submissions and doing actions
  CANCEL: 'CANCEL',
} as const;

export interface DialogData {
  title: string;
  content: DialogMessageProps | DialogComponentProps;
  actions?: DialogAction[] | null;
}

export interface DialogMessageProps {
  type: 'message';
  message: string;
}

export interface DialogComponentProps {
  type: 'component';
  component: any;
  props: any; // extra properties to be passed to the component
}

export interface DialogAction {
  label: string;
  type: (typeof DialogActionTypes)[keyof typeof DialogActionTypes];
  data?: any;
  className?: string;
  color?: ThemePalette;
  disabled$?: BehaviorSubject<boolean>;
  closeHandler?: () => Observable<any>;
}

export const DIALOG_BUTTONS = {
  CLOSE: { label: 'Close', type: DialogActionTypes.CANCEL },
  CANCEL: { label: 'Cancel', type: DialogActionTypes.CANCEL },
  SUBMIT: { label: 'Submit', type: DialogActionTypes.OK },
};
