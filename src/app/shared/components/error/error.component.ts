import {Component, EventEmitter, Input, Output} from '@angular/core';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

import { faC } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {

  @Input() size: SizeProp;
  @Output('onRefresh') onRefresh = new EventEmitter<boolean>();
  // faCircleNotch = faCircleNotch;
  // faSpinner = faSpinner;
  faC = faC;

  refresh(){
    this.onRefresh.emit(true);
  }

}
