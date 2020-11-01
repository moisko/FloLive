import {Injectable} from '@angular/core';
import {Stomp} from '@stomp/stompjs';
import * as SockJS from 'sockjs-client';
import {RgbColor} from './app.component';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class WebsocketService {
  public readonly rgbColorChangeEvent: BehaviorSubject<RgbColor>;

  private stompClient;

  constructor() {
    this.rgbColorChangeEvent = new BehaviorSubject<RgbColor>({} as RgbColor);
  }

  public connect(url): any {
    if (!this.stompClient) {
      const socket = new SockJS(url);
      this.stompClient = Stomp.over(socket);
      this.stompClient.connect({}, () => {
        this.stompClient.subscribe('/topic/rgbColor', (rgbColor) => {
          const rgbColorAsObject = JSON.parse(rgbColor.body);
          this.rgbColorChangeEvent.next({r: rgbColorAsObject.r, g: rgbColorAsObject.g, b: rgbColorAsObject.b} as RgbColor);
        });
      });
    }
  }

  public disconnect(): void {
    if (this.stompClient !== null) {
      this.stompClient.disconnect();
    }
  }

  public sendMessage(message: RgbColor): void {
    this.stompClient.send(
      '/app/rgb',
      {},
      JSON.stringify({r: message.r, g: message.g, b: message.b})
    );
  }
}
