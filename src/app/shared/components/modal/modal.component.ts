import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { StateManager } from '../../../services/state-manager.service';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements AfterViewInit {
  @ViewChild('modalOverlay', { read: ElementRef })
  modalOverlay: ElementRef<HTMLElement>;

  faClose = faClose;

  constructor(private stateManager: StateManager) {
    console.log('modal constructed');
  }

  ngAfterViewInit(): void {
    this.stateManager
      .modalOpened$
      .subscribe((value: boolean) => {
        if (value) {
          console.log('Step 1..');
          this.openModal();
        }
      });
  }

  openModal() {
    this.modalOverlay
      .nativeElement
      .addEventListener('click', (event) => {
        console.log('Overlay clicked')
        this.closeModalEventHandler(event)
      }
      );

    this.modalOverlay.nativeElement.style.scale = '1';
    this.modalOverlay.nativeElement.style.opacity = '1';
    this.modalOverlay.nativeElement.style.backdropFilter = 'blur(4px)';
    this.modalOverlay.nativeElement.style.visibility = 'visible';
  }

  closeModal() {
    this.modalOverlay.nativeElement.style.opacity = '0';
    this.modalOverlay.nativeElement.style.scale = '0';
    this.modalOverlay.nativeElement.style.backdropFilter = 'blur(0)';
    this.modalOverlay.nativeElement.style.visibility = 'hidden';
  }

  closeModalEventHandler(event: Event) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('overlay')) {
      this.closeModal();
    }
  }
}
