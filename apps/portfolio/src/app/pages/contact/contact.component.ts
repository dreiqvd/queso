import { NgOptimizedImage } from '@angular/common';
import { Component } from '@angular/core';
import { MatTooltip } from '@angular/material/tooltip';

import { QsAnimations } from '@queso/common/animations';

import { ContactForm } from '../../components/contact-form';
import { PageContainer } from '../../components/page-container';

@Component({
  selector: 'app-contact',
  imports: [
    NgOptimizedImage,
    MatTooltip,
    QsAnimations,
    PageContainer,
    ContactForm,
  ],
  templateUrl: './contact.component.html',
})
export class ContactPage {
  readonly greetingTxt = 'hello'.split('');
  readonly messages = [
    "Clarifications? Questions? Let's <br /> hear them — I won't bite.",
    'My inbox is always open!',
  ];
}
