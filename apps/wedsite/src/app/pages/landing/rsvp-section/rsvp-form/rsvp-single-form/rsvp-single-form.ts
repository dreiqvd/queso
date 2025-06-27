import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

import { GuestGroup } from '../../../../../../app/models/Guest';

@Component({
  selector: 'app-rsvp-single-form',
  imports: [MatButtonModule],
  templateUrl: './rsvp-single-form.html',
})
export class RsvpSingleForm {
  readonly guestGroup = input.required<GuestGroup>();
  readonly sendRsvp = output<GuestGroup>();

  setResponse(response: 'YES' | 'NO'): void {
    this.guestGroup().members.forEach((member) => {
      member.attending = response === 'YES';
    });
    this.sendRsvp.emit(this.guestGroup());
  }
}
