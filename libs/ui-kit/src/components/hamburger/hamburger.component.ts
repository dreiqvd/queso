import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';

@Component({
  selector: 'qs-hamburger',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './hamburger.component.html',
  styleUrl: './hamburger.component.scss',
})
export class HamburgerComponent {}
