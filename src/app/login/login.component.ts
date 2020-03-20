import { Component, OnInit } from '@angular/core';
import { Validators, FormBuilder, FormGroup } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { Router } from '@angular/router';
import { AuthService } from '../service/auth.service';
import { UiService } from '../service/ui.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  url = environment.APPURL;

  loginForm: FormGroup;

  submitted = false;

  constructor(
    private http: HttpClient,

    private formsbuild: FormBuilder,

    private activatedRouter: Router,

    private authService: AuthService,

    private uiservice: UiService

  ) { }

  ngOnInit() {

    this.loginFormInit();

  }

  loginFormInit() {

    this.loginForm = this.formsbuild.group({

      username: ['', [Validators.required]],

      password: ['', [Validators.required]],

    });

  }

  login(credentials: FormGroup) {

    this.submitted = true;

    if (credentials.get('username').invalid) {

      this.submitted = false;
      alert('Username is required');

    } else if (credentials.get('password').invalid) {

      this.submitted = false;
      alert('Password is required');

    } else {

      this.http.post<any>(`${this.url}login`, credentials.value).subscribe(

        response => {

          this.submitted = false;

          if (response.code == 1) {

            this.uiservice.showToast(response.short_description);

            this.authService.login(response.data.accessToken);

            if (this.authService.isAuthenticate) {

              this.activatedRouter.navigate(['dashboard']);

              this.uiservice.showToast('Access Granted');

              return;
            } else {

              this.submitted = false;

              this.uiservice.showToast('Invalid credentials provided!');

              return;
            }
          } else {

            this.submitted = false;

            this.uiservice.showToast('Invalid credentials provided!');

            return;
          }
        },

        error => {

          this.submitted = false;

          this.uiservice.showToast('An error occurred please check your internet connection');
        }

      );
    }


  }
}
