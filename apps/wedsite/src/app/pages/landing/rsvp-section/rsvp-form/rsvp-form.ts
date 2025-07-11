import { Component, inject, signal } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { QsDialogComponent } from '@queso/ui-kit/dialog';

import { Loader } from '../../../../components/loader/loader';
import { GuestGroup } from '../../../../models/Guest';
import { GuestService } from '../../../../services/guest';

import { RsvpGroupForm } from './rsvp-group-form/rsvp-group-form';
import { RsvpResults } from './rsvp-results/rsvp-results';
import { RsvpSingleForm } from './rsvp-single-form/rsvp-single-form';

@Component({
  selector: 'app-rsvp-form',
  imports: [
    MatButtonModule,
    Loader,
    RsvpResults,
    RsvpGroupForm,
    RsvpSingleForm,
  ],
  templateUrl: './rsvp-form.html',
})
export class RSVPForm extends QsDialogComponent {
  // Properties from/for dialog data
  protected data!: {
    guestGroup: GuestGroup;
  };

  private readonly guestService = inject(GuestService);

  protected readonly isLoading = signal(false);
  protected readonly showSubmitError = signal(false);
  protected readonly rsvpSent = signal(false);
  protected readonly isAttending = signal(false);

  sendRsvp(guestGroup: GuestGroup): void {
    this.isLoading.set(true);
    this.guestService.sendRsvp(guestGroup).subscribe({
      next: () => {
        this.rsvpSent.set(true);
        this.isLoading.set(false);
        this.isAttending.set(
          guestGroup.members.some((member) => member.attending)
        );
      },
      error: () => {
        this.isLoading.set(false);
        this.showSubmitError.set(true);
      },
    });
  }

  close(): void {
    this.dialogRef.close();
  }
}
