import { Component, OnInit } from '@angular/core';
import { EmailService } from '../email.service';

@Component({
  selector: 'app-email-index',
  templateUrl: './email-index.component.html',
  styleUrls: ['./email-index.component.scss']
})
export class EmailIndexComponent implements OnInit {

  emails: { id: string, subject: string, from: string }[] = [];

  constructor(private emailService: EmailService) { }

  ngOnInit(): void {
    this.emailService.getEmails().subscribe(data => {
      this.emails = data;
    })
  }

}
