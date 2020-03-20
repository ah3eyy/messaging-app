import { Injectable } from '@angular/core';
import { CacheService } from './caches.service';
import { HttpClient, HttpHeaders } from '@angular/common/http';
// import { environment } from 'src/environments/environment';
import { Router } from '@angular/router';
import { environment } from 'src/environments/environment.prod';

const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
  })
};

interface LogResponse {
  istatus: boolean;
  token: string;
  role: string;
  code: number;
  message: string;
}

export interface IAuthStatus {
  isAuthenticated: boolean;
  role: string;
  token: string;
}

@Injectable({
  providedIn: 'root'
})
export class AuthService extends CacheService {

  resstatus: boolean;

  login(token: string) {

    this.setCookie("token", token, 1);

  }

  notificationTokenlogin(token: string) {

    this.setCookie("notificationtoken", token, 1);

  }

  logout() {
    this.deleteCookie("token", " ", 2);
  }

  registerToken(token: string) {

    if (this.isAuthenticate()) {

      this.httpClient.post<any>(`${environment.APPURL}save-token`, { token: token }).subscribe(

        data => {

          console.log(data);

        },

        error => {

          console.log(error);
        }
        
      );

    } else {

      this.notificationTokenlogin(token);

    }

  }

  isAuthenticate() {


    if (this.getCookie('token') != '' && this.getCookie('token') != null) {

      return true;

    }

    return false;
  }

  getLogin() {
    return this.getCookie('token');
  }

  getToken() {



    if (this.getCookie('token')) {



      return this.getCookie('token');

    }

    return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
  }

  authStatus(): IAuthStatus {
    return {
      'isAuthenticated': this.isAuthenticate(),
      'role': this.getRole(),
      'token': this.getLogin()
    }
  }

  getRole() {
    return this.getCookie('role');
  }

  constructor(private httpClient: HttpClient, private route: Router) {
    super();
  }
}
