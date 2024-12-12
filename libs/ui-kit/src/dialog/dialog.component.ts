import { AsyncPipe } from '@angular/common';
import {
  AfterViewInit,
  Component,
  DestroyRef,
  inject,
  Inject,
  OnInit,
  signal,
  ViewChild,
  ViewContainerRef,
} from '@angular/core';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { MatButton } from '@angular/material/button';
import {
  MAT_DIALOG_DATA,
  MatDialogModule,
  MatDialogRef,
} from '@angular/material/dialog';
import { MatTooltip } from '@angular/material/tooltip';

import { QsIconComponent } from '../icon';

import {
  DialogAction,
  DialogActionTypes,
  DialogData,
} from './dialog.interface';

@Component({
  selector: 'qs-dialog',
  standalone: true,
  imports: [AsyncPipe, MatDialogModule, MatTooltip, MatButton, QsIconComponent],
  templateUrl: './dialog.component.html',
  styleUrl: './dialog.component.scss',
})
export class DialogComponent implements OnInit, AfterViewInit {
  @ViewChild('componentContainer', { read: ViewContainerRef })
  componentContainer?: ViewContainerRef;

  readonly showLoader = signal<boolean>(false);
  readonly destroyRef = inject(DestroyRef);

  constructor(
    public dialogRef: MatDialogRef<DialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: DialogData
  ) {}

  ngOnInit(): void {
    this.data.actions?.forEach((action) => {
      if (action.type === 'OK') {
        action.color = 'primary';
      }
    });
  }

  ngAfterViewInit(): void {
    // Remove focus from the active element inside the dialog. This is to prevent the
    // accessibility issue when opening a dialog
    // https://stackoverflow.com/questions/79159883/warning-blocked-aria-hidden-on-an-element-because-its-descendant-retained-focu
    (document.activeElement as HTMLElement)?.blur();

    setTimeout(() => {
      // Generate a dynamic component as dialog content and assign properties
      if (this.data.content.type === 'component' && this.componentContainer) {
        const { component, props } = this.data.content;
        const componentRef = this.componentContainer.createComponent(component);
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const componentInstance = componentRef.instance as any;

        if (props) {
          Object.assign(componentInstance, props);
        }

        // If OK action exists, assign specific properties to the OK button
        // dialogOkDisabled$ = handles the disabled state of the OK button
        // dialogCloseHandler = handles the close event of the dialog
        const okAction = this.data.actions?.find(
          (a) => a.type === DialogActionTypes.OK
        );
        if (okAction) {
          setTimeout(() => {
            okAction.disabled$ = componentInstance.dialogOkDisabled$;
            okAction.data = { ...okAction.data, componentInstance };
            okAction.closeHandler = componentInstance.dialogCloseHandler;
          });
        }
      }
    });
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  private close(data: any = undefined): void {
    this.dialogRef.close(data);
  }

  onActionClick(action: DialogAction): void {
    if (action.type === DialogActionTypes.CANCEL) {
      this.close();
    } else if (action.closeHandler) {
      this.showLoader.set(true);
      action
        .closeHandler()
        .pipe(takeUntilDestroyed(this.destroyRef))
        .subscribe((result) => {
          this.dialogRef.close({ data: result });
        });
    } else {
      this.dialogRef.close({ data: action });
    }
  }
}
