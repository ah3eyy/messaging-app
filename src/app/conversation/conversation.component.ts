import { Component, OnInit } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MessagingService } from '../messaging.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit {

  success = false;

  loading = false;

  networkError = false;

  getParam;

  message: string;

  data: any;

  nomessage = true;

  messagecontent: FormGroup;

  messages;

  newmessage;

  constructor(
    private http: HttpClient,

    private messagingService: MessagingService,

    private actrouter: ActivatedRoute,

    private formbuilder: FormBuilder
  ) {

    this.getParam = actrouter.params['value'].username;

  }

  ngOnInit() {


    this.messagingService.requestPermission();

    this.messagingService.receiveMessage();

    this.messages = this.messagingService.currentMessage

    this.loading = true;

    this.success = false;

    this.networkError = false;

    this.messagecontentInit();

    this.onLoad();

  }


  messagecontentInit() {
    this.messagecontent = this.formbuilder.group({

      message: ['']

    });
  }

  onLoad() {

    this.http.post<any>(`${environment.APPURL}fetch-user-conversation`, { to: this.getParam }).subscribe(

      data => {

        this.loading = false;

        if (data.code == 1) {

          this.data = data.data.messages;

          console.log(data.data);

          if (data.data.messages.length > 0) {

            this.nomessage = false;

          }


          return;
        }


        this.networkError = true;

      },

      error => {

        this.networkError = true;

        this.loading = false;

      }

    );

  }


  updateinput(event) {

    if (event.target.value && event.target.value !== '' && event.target.value.length > 0) {

      this.message = event.target.value;

    }

  }

  messageSend() {

    if (this.message && this.message !== '' && this.message.length > 0) {

      this.messagecontent.get('message').setValue('');

      this.http.post<any>(`${environment.APPURL}send-message`, { to: this.getParam, message: this.message }).subscribe(

        data => {

          this.loading = false;

          if (data.code == 1) {

            this.newmessage = this.message
            console.log(data);

            return;
          }


          this.networkError = true;

        },

        error => {

          this.networkError = true;

          this.loading = false;

        }

      );

    }

  }

}
