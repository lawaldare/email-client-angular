import { Component, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../auth.service';
import { Matchpassword } from '../validators/matchpassword';
import { Uniqueusername } from '../validators/uniqueusername';

@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrls: ['./signup.component.scss']
})
export class SignupComponent implements OnInit {

  authForm = new FormGroup({
    username: new FormControl('', [
      Validators.required,
      Validators.minLength(3),
      Validators.maxLength(20),
      Validators.pattern(/^[a-z0-9]+$/),
    ], [this.uniqueUsername.validate]),
    password: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ]),
    passwordConfirmation: new FormControl('', [
      Validators.required,
      Validators.minLength(4),
      Validators.maxLength(20)
    ])
  }, { validators: [this.matchpassword.validate] })

  constructor(private matchpassword: Matchpassword, private uniqueUsername: Uniqueusername, private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
  }


  register() {
    if (this.authForm.invalid) {
      return;
    } else {
      this.authService.signup(this.authForm.value).subscribe(response => {
        this.router.navigateByUrl('/inbox');
      }, error => {
        if (!error.status) {
          this.authForm.setErrors({ noConnection: true })
        } else {
          this.authForm.setErrors({ unknownError: true })
        }
      })
    }
  }

}
