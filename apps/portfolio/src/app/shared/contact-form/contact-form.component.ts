import { NgTemplateOutlet } from '@angular/common';
import { Component, OnInit, signal } from '@angular/core';
import {
  FormControl,
  FormGroup,
  ReactiveFormsModule,
  Validators,
} from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatTooltip } from '@angular/material/tooltip';

import { AnimationsDirective } from '@queso/common/directives';
import { IconComponent } from '@queso/ui-kit/icon';
import { InputComponent } from '@queso/ui-kit/input';
import { TextareaComponent } from '@queso/ui-kit/textarea';

import { MailingService } from '../../services/mailing.service';

@Component({
  selector: 'qs-contact-form',
  standalone: true,
  imports: [
    NgTemplateOutlet,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatTooltip,
    AnimationsDirective,
    InputComponent,
    TextareaComponent,
    IconComponent,
  ],
  templateUrl: './contact-form.component.html',
  styleUrl: './contact-form.component.scss',
  providers: [MailingService],
})
export class ContactFormComponent implements OnInit {
  /** Whether the form is currently being sent */
  readonly showOverlay = signal(false);

  /** Whether the submit button should be disabled */
  readonly submitDisabled = signal(true);

  /** Whether sending of email has been completed */
  readonly sendingDone = signal(false);

  /** Whether sending of email got an error */
  readonly hasErrors = signal(false);

  constructor(private mailingService: MailingService) {}

  readonly contactForm = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.maxLength(50)]),
    email: new FormControl('', [Validators.required, Validators.email]),
    subject: new FormControl('', [
      Validators.required,
      Validators.maxLength(100),
    ]),
    message: new FormControl('', Validators.required),
  });

  ngOnInit(): void {
    this.contactForm.statusChanges.subscribe((status) => {
      this.submitDisabled.set(status !== 'VALID');
    });
  }

  onSubmitForm(): void {
    this.showOverlay.set(true);

    const { name, email, subject, message } = this.contactForm.value;
    if (this.contactForm.valid) {
      this.mailingService
        .sendMail(
          name as string,
          email as string,
          subject as string,
          message as string
        )
        .subscribe({
          next: () => {
            this.sendingDone.set(true);
            this.contactForm.reset();
            this.contactForm.markAsPristine();
            this.contactForm.markAsUntouched();
          },
          error: () => {
            this.sendingDone.set(true);
            this.hasErrors.set(true);
          },
        });
    }
  }
}
