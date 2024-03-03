import { NgTemplateOutlet } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltip } from '@angular/material/tooltip';

import { AnimationsDirective } from '@queso/common';
import { InputComponent } from '@queso/ui-kit/input';
import { TextareaComponent } from '@queso/ui-kit/textarea';

@Component({
  selector: 'qs-contact-form',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTooltip,
    InputComponent,
    TextareaComponent,
    AnimationsDirective,
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
})
export class ContactFormComponent implements OnInit {
  readonly contactForm = new FormGroup({
    name: new FormControl(null, [
      Validators.required,
      Validators.maxLength(50),
    ]),
    email: new FormControl(null, [Validators.required, Validators.email]),
    subject: new FormControl(null, [
      Validators.required,
      Validators.maxLength(100),
    ]),
    message: new FormControl(null, Validators.required),
  });

  ngOnInit(): void {
    this.contactForm.valueChanges.subscribe((value) => {
      // console.log(value);
    });
  }

  onSubmitForm(): void {
    console.log(this.contactForm.value);
  }
}
