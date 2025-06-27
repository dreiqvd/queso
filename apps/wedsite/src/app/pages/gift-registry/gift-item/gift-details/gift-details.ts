import { Component, inject, OnInit, signal } from '@angular/core';
import { FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { filter, switchMap, tap } from 'rxjs';

import { inputDebounce } from '@queso/common/operators';
import { QsFormField } from '@queso/ui-kit/form-field';

import { Loader } from '../../../../components/loader/loader';
import { RegistryGift } from '../../../../models/GiftRegistry';
import { GuestService } from '../../../../services/guest';
import { QsIcon } from '../../../../../../../../libs/ui-kit/src/icon/icon.component';
import { MatDialogRef } from '@angular/material/dialog';
import { QsDialog } from '@queso/ui-kit/dialog/dialog.component';
import { GiftRegistryService } from 'apps/wedsite/src/app/services/gift-registry';

@Component({
  selector: 'app-gift-details',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatInputModule,
    QsFormField,
    Loader,
    QsIcon,
  ],
  templateUrl: './gift-details.html',
  styles: `
    :host {
      --mat-form-field-container-vertical-padding: 9px;
    }
  `,
})
export class GiftDetails implements OnInit {
  // Properties from/for dialog data
  protected gift!: RegistryGift;
  protected dialogRef!: MatDialogRef<QsDialog>;

  private readonly guestService = inject(GuestService);
  private readonly giftRegistryService = inject(GiftRegistryService);

  protected readonly isLoading = signal(false);
  protected readonly isSubmitDisabled = signal(true);
  protected readonly isLocked = signal(false);
  protected readonly showSubmitError = signal(false);

  protected readonly inviteCodeControl = new FormControl<string>(
    '',
    Validators.required
  );

  ngOnInit(): void {
    this.setFormSubscriptions();
  }

  private setFormSubscriptions(): void {
    this.inviteCodeControl.valueChanges
      .pipe(
        tap(() => this.isSubmitDisabled.set(true)),
        filter((value) => !!value?.trim()),
        inputDebounce,
        tap(() => this.isLoading.set(true)),
        switchMap((value) =>
          this.guestService.findGuest((value as string).trim().toLowerCase())
        )
      )
      .subscribe({
        next: (guestGroup) => {
          if (guestGroup) {
            this.inviteCodeControl.setErrors(null);
          } else {
            this.inviteCodeControl.setErrors({
              notFound: true,
            });
            this.inviteCodeControl.markAsTouched();
          }
          this.isLoading.set(false);
          this.isSubmitDisabled.set(false);
        },
        error: () => {
          this.inviteCodeControl.setErrors({
            notFound: true,
          });
          this.inviteCodeControl.markAsTouched();
          this.isLoading.set(false);
        },
      });
  }

  reserveGift(): void {
    this.isLoading.set(true);
    this.giftRegistryService.reserveGift(this.gift).subscribe({
      next: () => {
        this.isLoading.set(false);
        this.isLocked.set(true);
      },
      error: () => {
        this.isLoading.set(false);
        this.showSubmitError.set(true);
      },
    });
  }
}
