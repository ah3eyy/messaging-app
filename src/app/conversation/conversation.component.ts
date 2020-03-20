import { Component, OnInit, ViewChild, AfterViewInit, ChangeDetectorRef } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { ActivatedRoute } from '@angular/router';
import { environment } from 'src/environments/environment.prod';
import { FormGroup, FormBuilder } from '@angular/forms';
import { MessagingService } from '../messaging.service';
import { ScrollToBottomDirective } from '../scroll-to-bottom.directive';
import { DataService } from '../data.service';
import { UiService } from '../service/ui.service';

@Component({
  selector: 'app-conversation',
  templateUrl: './conversation.component.html',
  styleUrls: ['./conversation.component.css']
})
export class ConversationComponent implements OnInit, AfterViewInit {

  @ViewChild(ScrollToBottomDirective, { static: true }) scroll: ScrollToBottomDirective;

  container: HTMLElement;

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

  submit = false;

  constructor(
    private http: HttpClient,

    private messagingService: MessagingService,

    private actrouter: ActivatedRoute,

    private formbuilder: FormBuilder,

    private datas: DataService,

    private cdf: ChangeDetectorRef,

    private uiservice: UiService

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

    this.datas.currentMessage.subscribe(message => this.reloadMessages(message))

  }

  reloadMessages(message) {

    if (message == 'true') {

      this.http.post<any>(`${environment.APPURL}fetch-user-conversation`, { to: this.getParam }).subscribe(

        data => {

          this.loading = false;

          if (data.code == 1) {

            this.data = data.data.messages;

            this.uiservice.showToast("New message");

            console.log(data.data);

            if (data.data.messages.length > 0) {

              this.nomessage = false;

            }

            this.cdf.detectChanges();

            return;
          }

          this.networkError = true;

        },

        error => {

          this.networkError = true;

          this.loading = false;

        }

      );

      this.datas.changeMessage("false");
    }

  }


  ngAfterViewInit() {
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

      this.submit = true;

      this.messagecontent.get('message').setValue('');

      this.updataMessage(this.message);

      if (this.data.length > 0) {

        this.nomessage = false;

      }


      this.http.post<any>(`${environment.APPURL}send-message`, { to: this.getParam, message: this.message }).subscribe(

        data => {

          console.log(data);

          if (data.code == 1) {

            console.log(data);

            this.submit = false;

            return;
          }


        },

        error => {

          this.submit = false;

        }

      );

    }

  }

  updataMessage(message) {

    this.data.push({ message: message, fetch_from_user_details: { username: '' } });

  }

}
