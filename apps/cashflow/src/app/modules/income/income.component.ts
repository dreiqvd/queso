import { Component } from '@angular/core';

import { NavbarComponent } from '../../components/navbar';

@Component({
  selector: 'app-income',
  standalone: true,
  imports: [NavbarComponent],
  templateUrl: './income.component.html',
})
export class IncomeComponent {}
