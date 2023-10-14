import { Component, Input } from '@angular/core';
import { SizeProp } from '@fortawesome/fontawesome-svg-core';

import { faC } from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'loading-spinner',
  templateUrl: './loading-spinner.component.html',
  styleUrls: ['./loading-spinner.component.css']
})
export class LoadingSpinnerComponent {

  @Input() size: SizeProp;

  // faCircleNotch = faCircleNotch;
  // faSpinner = faSpinner;
  faC = faC;

}
