import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable()
export class MailingService {
  private readonly httpClient = inject(HttpClient);

  sendMail(
    name: string,
    email: string,
    subject: string,
    message: string
  ): Observable<void> {
    return this.httpClient.post<void>(`${environment.apiUrl}/mail`, {
      name,
      email,
      subject,
      message,
    });
  }
}
