import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-rsvp-results',
  imports: [MatButtonModule],
  templateUrl: './rsvp-results.html',
})
export class RsvpResults {
  readonly isAttending = input.required<boolean>();
  readonly closed = output<void>();
}
