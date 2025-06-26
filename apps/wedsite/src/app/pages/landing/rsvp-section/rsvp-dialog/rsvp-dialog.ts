import { Component } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatRadioModule } from '@angular/material/radio';

import { GuestParty } from '../../../../models/Guest';

@Component({
  selector: 'app-rsvp-dialog',
  imports: [FormsModule, MatRadioModule, MatButtonModule],
  templateUrl: './rsvp-dialog.html',
})
export class RsvpDialog {
  protected guestParties!: GuestParty[];

  protected selectedParty: string | undefined;

  confirmRsvp(): void {
    console.log('RSVP confirmed for party:', this.selectedParty);
  }
}
