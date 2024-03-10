import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

import { environment } from '../../environments/environment';

@Injectable()
export class MailingService {
  constructor(private httpClient: HttpClient) {}

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
