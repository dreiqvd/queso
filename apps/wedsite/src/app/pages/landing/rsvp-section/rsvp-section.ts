import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { QsFormField } from '@queso/ui-kit/form-field';

@Component({
  selector: 'app-rsvp-section',
  imports: [MatFormFieldModule, MatInputModule, MatButtonModule, QsFormField],
  templateUrl: './rsvp-section.html',
})
export class RSVPSection {}
