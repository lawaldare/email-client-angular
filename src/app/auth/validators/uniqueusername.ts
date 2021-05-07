import { AuthService } from './../auth.service';
import { Injectable } from "@angular/core";
import { AsyncValidator, FormControl } from "@angular/forms";
import { of } from "rxjs";
import { map, catchError } from 'rxjs/operators'


@Injectable({ providedIn: 'root' })
export class Uniqueusername implements AsyncValidator {
  constructor(private authService: AuthService) { }

  validate = (control: FormControl) => {
    const { value } = control;
    return this.authService.checkUsernameAvailability(value).pipe(
      map(value => {
        return null;
      }),
      catchError(err => {
        if (err.error.username) {
          return of({ nonUniqueUsername: true })
        } else {
          return of({ noConnection: true })
        }
      })
    )
  }
}
