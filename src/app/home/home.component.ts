import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  success = false;

  networkError = false;

  loading = false;

  data: any;

  constructor(private http: HttpClient) { }

  ngOnInit() {

    this.success = false;

    this.networkError = false;

    this.loading = true;

    this.loadMessages();

  }

  loadMessages() {

    this.http.post<any>(`${environment.APPURL}fetch-message`, {}).subscribe(

      data => {

        this.loading = false;

        if (data.code == 1) {

          this.success = true;

          console.log(data);

          this.data = data.data;

          return;
        }

        this.networkError = true;

      },

      error => {

        this.networkError = true;

        this.loading = true;

      }

    );

  }

}
