import {Component, ElementRef, OnDestroy, OnInit, ViewChild} from '@angular/core';
import {NgForm} from '@angular/forms';
import {WebsocketService} from './websocket.service';
import {environment} from '../environments/environment';

export interface RgbColor {
  r: number;
  g: number;
  b: number;
}

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  @ViewChild('f', {static: true}) rgbColorForm: NgForm;

  @ViewChild('rgbColorDiv', {static: true}) rgbColorDiv: ElementRef;

  rgbColor: RgbColor = {
    r: 0,
    g: 0,
    b: 0
  };

  constructor(private webSocketService: WebsocketService) {
  }

  ngOnInit(): void {
    this.resetBackgroundColor();

    this.webSocketService
      .connect(environment.RGB_WEBSOCKET_URL)
      .subscribe(rgbColor => this.updateBackgroundColor(rgbColor));
  }

  ngOnDestroy(): void {
    this.webSocketService.disconnect();
  }

  public onSubmit(formValue): void {
    this.resetBackgroundColor();

    this.webSocketService.sendMessage(
      {r: formValue.r, g: formValue.g, b: formValue.b} as RgbColor
    );
  }

  public updateBackgroundColor(rgbColor: RgbColor): void {
    this.rgbColorDiv.nativeElement.style.backgroundColor = 'rgb(' + rgbColor.r + ',' + rgbColor.g + ',' + rgbColor.b + ')';
  }

  private resetBackgroundColor(): void {
    this.rgbColorDiv.nativeElement.style.backgroundColor = '';
  }
}
