import { Email, EmailService } from './../email.service';
import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-email-create',
  templateUrl: './email-create.component.html',
  styleUrls: ['./email-create.component.scss']
})
export class EmailCreateComponent implements OnInit {


  showModal: boolean = false;
  email: Email;
  constructor(private auth: AuthService, private emailService: EmailService) { }

  ngOnInit(): void {
    this.email = {
      id: '',
      to: '',
      subject: '',
      html: '',
      text: '',
      from: `${this.auth.username}@angular-email.com`,
    }
  }


  onSubmit(event: Email) {
    this.emailService.sendEmail(event).subscribe(data => {
      this.showModal = false;
    });
  }

}
