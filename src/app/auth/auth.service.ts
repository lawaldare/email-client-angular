import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  BASE_URL = "https://api.angular-email.com/";

  signedin$ = new BehaviorSubject(null);

  username = "";

  constructor(private http: HttpClient) { }


  checkUsernameAvailability(username: string) {
    return this.http.post<{ available: boolean }>(`${this.BASE_URL}auth/username`, { username })
  }

  signup(credentials: { username: string, password: string, confirmPassword: string }) {
    return this.http.post<{ username: string }>(`${this.BASE_URL}auth/signup`, credentials).pipe(
      tap(({ username }) => {
        this.signedin$.next(true);
        this.username = username;
      })
    )
  }

  signin(credentials: { username: string, password: string }) {
    return this.http.post<{ username: string }>(`${this.BASE_URL}auth/signin`, credentials).pipe(
      tap(({ username }) => {
        this.signedin$.next(true);
        this.username = username;
      })
    )
  }

  signedout() {
    return this.http.post(`${this.BASE_URL}auth/signout`, {}).pipe(
      tap(() => {
        this.signedin$.next(false)
      })
    )
  }

  checkIfUserIsSignedIn() {
    return this.http.get<{ authenticated: boolean, username: string }>(`${this.BASE_URL}auth/signedin`).pipe(
      tap(({ authenticated, username }) => {
        this.signedin$.next(authenticated);
        this.username = username;
      })
    )
  }
}
