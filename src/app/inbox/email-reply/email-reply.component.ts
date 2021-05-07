import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Email, EmailService } from '../email.service';

@Component({
  selector: 'app-email-reply',
  templateUrl: './email-reply.component.html',
  styleUrls: ['./email-reply.component.scss']
})
export class EmailReplyComponent {

  showModal: boolean = false;
  @Input() email: Email;

  constructor(private emailService: EmailService, private authService: AuthService) { }

  ngOnChanges(): void {
    this.email = {
      ...this.email,
      from: this.email.to,
      to: this.email.from,
      subject: `RE: ${this.email.subject}`,
      text: `\n\n\n------- ${this.email.from} wrote:\n> ${this.email.text.replace(/\n/gi, '\n> ')}`
    }
  }

  onSubmit(event: Email) {
    this.emailService.sendEmail(event).subscribe(data => {
      this.showModal = false;
    });
  }

}
