import {Component, ElementRef, OnInit, ViewChild} from '@angular/core';
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
export class AppComponent implements OnInit {
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
    this.webSocketService.connect(environment.RGB_WEBSOCKET_URL);
    this.webSocketService.rgbColorChangeEvent.subscribe(value => this.updateRgbColor({r: value.r, g: value.g, b: value.b} as RgbColor));
  }

  public onSubmit(formValue): void {
    this.rgbColorDiv.nativeElement.style.backgroundColor = '';
    this.webSocketService.sendMessage(
      {r: formValue.r, g: formValue.g, b: formValue.b} as RgbColor
    );
  }

  public updateRgbColor(rgbColor: RgbColor): void {
    this.rgbColorDiv.nativeElement.style.backgroundColor = 'rgb(' + rgbColor.r + ',' + rgbColor.g + ',' + rgbColor.b + ')';
  }
}
