import { Injectable } from '@angular/core';
import { io, Socket } from 'socket.io-client';
import { environment } from 'src/environments/environment';

@Injectable({
  providedIn: 'root'
})
export class NotificationService {

   private socket: Socket;
  private readonly SERVER_URL = environment.notificationUrl; 

  constructor() {
    this.socket = io(this.SERVER_URL, {
      transports: ['websocket'],
    });
  }
  onNewComment(articleId: string, callback: (comment: any) => void) {
    this.socket.on(`commentAddedToArticle:${articleId}`, callback);
  }

  disconnect() {
    this.socket.disconnect();
  }
}
