import { Component } from '@angular/core';

@Component({
  selector: 'app-loading-spinner',
  template:
    '<div class="backdrop"><div class="loading-spinner"><div class="lds-ring"><div></div><div></div><div></div><div></div></div><div>Loading Data</div></div></div>',
  styleUrls: ['./loading-spinner.component.css'],
})
export class LoadingSpinnerComponent {}
