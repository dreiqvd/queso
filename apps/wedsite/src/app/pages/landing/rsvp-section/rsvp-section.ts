import { Component, inject, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { QsDialogService } from '@queso/ui-kit/dialog';
import { QsFormField } from '@queso/ui-kit/form-field';

import { GuestService } from '../../../services/guest.service';

@Component({
  selector: 'app-rsvp-section',
  imports: [
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    QsFormField,
  ],
  templateUrl: './rsvp-section.html',
})
export class RSVPSection {
  private readonly guestService = inject(GuestService);
  private readonly dialogService = inject(QsDialogService);

  protected readonly isSearching = signal(false);

  protected readonly rsvpForm = new FormGroup({
    search: new FormControl<string>('', Validators.required),
  });

  onFormSubmit(): void {
    const searchControl = this.rsvpForm.controls.search;
    const value = searchControl.value?.trim()?.toLowerCase();
    if (searchControl.invalid || !value) return;

    this.isSearching.set(true);
    searchControl.disable();
    this.guestService.findGuest(value).subscribe((guest) => {
      this.isSearching.set(false);
      searchControl.enable();
      if (guest) {
        this.dialogService.showMessage('', 'Found!');
      } else {
        searchControl.setErrors({ notFound: true });
      }
    });
  }
}
