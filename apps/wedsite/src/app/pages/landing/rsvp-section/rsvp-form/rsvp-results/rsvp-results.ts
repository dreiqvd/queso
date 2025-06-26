import { Component, input, output } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'app-rsvp-results',
  imports: [MatButtonModule],
  templateUrl: './rsvp-results.html',
})
export class RsvpResults {
  readonly selectedResponse = input.required<'YES' | 'NO'>();
  readonly closed = output<void>();
}
