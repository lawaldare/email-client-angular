import { Email } from './../email.service';
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-email-show',
  templateUrl: './email-show.component.html',
  styleUrls: ['./email-show.component.scss']
})
export class EmailShowComponent implements OnInit {

  email: Email;

  constructor(private route: ActivatedRoute) {
    this.route.data.subscribe(data => {
      this.email = data.email;
    })
  }

  ngOnInit(): void { }

}
