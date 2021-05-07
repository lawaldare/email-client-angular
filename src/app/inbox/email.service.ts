import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

interface EmailSummary { id: string, subject: string, from: string };
export interface Email { id: string, subject: string, from: string, text: string, to: string, html: string };

@Injectable({
  providedIn: 'root'
})
export class EmailService {

  BASE_URL = "https://api.angular-email.com/";

  constructor(private http: HttpClient) { }


  getEmails() {
    return this.http.get<EmailSummary[]>(`${this.BASE_URL}emails`);
  }

  getEmail(id: string) {
    return this.http.get<Email>(`${this.BASE_URL}emails/${id}`);
  }

  sendEmail(email: Email) {
    return this.http.post(`${this.BASE_URL}emails`, email)
  }

}
