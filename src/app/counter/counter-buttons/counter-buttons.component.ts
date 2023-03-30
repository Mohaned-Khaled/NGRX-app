import { Component, EventEmitter, Output } from '@angular/core';
import { Store } from '@ngrx/store';
import {
  decreaseCounter,
  increaseCounter,
  resetCounter,
} from '../state/counter.actions';

@Component({
  selector: 'app-counter-buttons',
  templateUrl: './counter-buttons.component.html',
  styleUrls: ['./counter-buttons.component.css'],
})
export class CounterButtonsComponent {
  constructor(private store: Store) {}

  onAction(type: string) {
    if (type === 'increase') this.store.dispatch(increaseCounter());
    else if (type === 'decrease') this.store.dispatch(decreaseCounter());
    else this.store.dispatch(resetCounter());
  }
}
