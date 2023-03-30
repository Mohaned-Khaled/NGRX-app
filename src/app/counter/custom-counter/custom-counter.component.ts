import { Component, OnInit } from '@angular/core';
import { NgForm } from '@angular/forms';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs';
import { AppState } from 'src/app/state/app.state';
import { changeMessage, customIncrease } from '../state/counter.actions';
import { getMsg } from '../state/counter.selectors';

@Component({
  selector: 'app-custom-counter',
  templateUrl: './custom-counter.component.html',
  styleUrls: ['./custom-counter.component.css'],
})
export class CustomCounterComponent implements OnInit {
  showMessage$: Observable<string>;

  constructor(private store: Store<AppState>) {}

  ngOnInit(): void {
    this.showMessage$ = this.store.select(getMsg);
  }

  onSubmitForm(f: NgForm) {
    const val: number = +f.value.number;

    this.store.dispatch(customIncrease({ value: val }));

    f.reset();
  }

  onChangeMsg() {
    this.store.dispatch(changeMessage());
  }
}
