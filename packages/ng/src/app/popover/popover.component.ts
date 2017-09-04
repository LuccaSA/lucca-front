import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs/Observable';
import { Subject } from 'rxjs/Subject';
import { PopoverPosition } from './popover.directive';

export type PopoverVisibility = 'initial' | 'visible' | 'hidden';

@Component({
  selector: 'lu-popover',
  templateUrl: './popover.component.html',
  styleUrls: ['./popover.component.scss']
})
export class LuPopoverComponent implements OnInit {
  _showTimeoutId: Timer;
  _hideTimeoutId: Timer;
  _visibility: PopoverVisibility;
  _closeOnInteraction: boolean;
  _transformOrigin: string = 'bottom';

  private _onHide: Subject<any> = new Subject();

  constructor() { }

  ngOnInit() {
  }

  show(position: PopoverPosition, delay: number): void {
    if (this._hideTimeoutId) {
      clearTimeout(this._hideTimeoutId);
    }

    this._closeOnInteraction = true;

    this._setTransformOrigin(position);

    this._showTimeoutId = setTimeout(() => {
      this._visibility = 'visible';

      this._closeOnInteraction = false;
      setTimeout(() => this._closeOnInteraction = true, 0);
    }, delay);
  }
  hide(delay: number): void {
    if (this._showTimeoutId) {
      clearTimeout(this._showTimeoutId);
    }

    this._hideTimeoutId = setTimeout(() => {
      this._visibility = 'hidden';
      this._closeOnInteraction = false;
    }, delay);
  }

  isVisible(): boolean {
    return this._visibility === 'visible';
  }

  afterHidden(): Observable<void> {
    return this._onHide.asObservable();
  }

  private _setTransformOrigin(value: PopoverPosition) {
    switch (value) {
      case 'before': this._transformOrigin = 'right'; break;
      case 'after':  this._transformOrigin = 'left'; break;
      case 'left':   this._transformOrigin = 'right'; break;
      case 'right':  this._transformOrigin = 'left'; break;
      case 'above':  this._transformOrigin = 'bottom'; break;
      case 'below':  this._transformOrigin = 'top'; break;
    }
  }
}
