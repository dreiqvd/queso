import { Component, effect, input, output, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCheckboxModule } from '@angular/material/checkbox';
import { MatRadioModule } from '@angular/material/radio';

import { GuestGroup } from '../../../../../../app/models/Guest';

@Component({
  selector: 'app-rsvp-group-form',
  imports: [FormsModule, MatRadioModule, MatCheckboxModule, MatButtonModule],
  templateUrl: './rsvp-group-form.html',
})
export class RsvpGroupForm {
  readonly guestGroup = input.required<GuestGroup>();
  readonly sendRsvp = output<GuestGroup>();

  protected readonly responseChoices = [
    { label: "We're all in—see you there! 🎉", value: 'all' },
    { label: "Sadly, we can't make it 😞", value: 'none' },
    { label: 'Some of us are coming ☺️', value: 'some' },
  ];

  protected readonly selectedResponse = signal<'all' | 'none' | 'some' | null>(
    null
  );
  protected readonly attendeesCount = signal<number | null>(null);
  protected readonly attendeesMsg = signal<string | null>(null);
  protected readonly submitEnabled = signal(false);

  private readonly ALL_MESSAGE = 'Yey! Excited to see you all!';
  private readonly NONE_MESSAGE = "Aww, no one coming? We'll miss you!";
  private readonly SOME_MESSAGE = 'A few yeses, a few maybes';

  constructor() {
    effect(() => {
      this.handleResponseChange();
    });
  }

  private handleResponseChange(): void {
    if (this.selectedResponse() === 'all') {
      this.attendeesCount.set(this.guestGroup().seats);
      this.attendeesMsg.set(this.ALL_MESSAGE);
      this.guestGroup().members.forEach((member) => {
        member.attending = true;
      });
      this.submitEnabled.set(true);
    } else if (this.selectedResponse() === 'none') {
      this.attendeesCount.set(0);
      this.attendeesMsg.set(this.NONE_MESSAGE);
      this.guestGroup().members.forEach((member) => {
        member.attending = false;
      });
      this.submitEnabled.set(true);
    } else {
      this.attendeesCount.set(null);
      this.attendeesMsg.set(this.SOME_MESSAGE);
      this.guestGroup().members.forEach((member) => {
        member.attending = false;
      });
      this.submitEnabled.set(false);
    }
  }

  onSelectAttendee(): void {
    const attendees = this.guestGroup().members.filter(
      (member) => member.attending
    );
    this.attendeesCount.set(attendees.length);
    const count = this.attendeesCount();
    if (count === 0) {
      this.attendeesMsg.set(this.NONE_MESSAGE);
    } else if (count === this.guestGroup().seats) {
      this.attendeesMsg.set(this.ALL_MESSAGE);
    } else {
      this.attendeesMsg.set(this.SOME_MESSAGE);
    }
    this.submitEnabled.set(count !== 0);
  }
}
