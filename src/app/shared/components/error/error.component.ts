import { Component, Input } from '@angular/core';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

import { faC } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'error',
  templateUrl: './error.component.html',
  styleUrls: ['./error.component.css']
})
export class ErrorComponent {

  @Input() size: SizeProp;

  // faCircleNotch = faCircleNotch;
  // faSpinner = faSpinner;
  faC = faC;

}
