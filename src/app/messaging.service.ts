import { Injectable } from '@angular/core';
import { AngularFireMessaging } from '@angular/fire/messaging';
import { BehaviorSubject } from 'rxjs'
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment.prod';
import { AuthService } from './service/auth.service';

@Injectable()

export class MessagingService {

  currentMessage = new BehaviorSubject(null);

  constructor(private angularFireMessaging: AngularFireMessaging, private authService: AuthService) {

    this.angularFireMessaging.messaging.subscribe(
      (_messaging) => {

       _messaging.onMessage = _messaging.onMessage.bind(_messaging);

       
        _messaging.onTokenRefresh = _messaging.onTokenRefresh.bind(_messaging);

      }
    )

  }

  requestPermission() {
    this.angularFireMessaging.requestToken.subscribe(
      (token) => {
        console.log(token);

        this.authService.registerToken(token);

      },
      (err) => {
        console.error('Unable to get permission to notify.', err);
      }
    );
  }

  receiveMessage() {

    this.angularFireMessaging.messages.subscribe(
      (payload) => {

        console.log("new message received. ", payload);

        this.currentMessage.next(payload);

      })
  }

}