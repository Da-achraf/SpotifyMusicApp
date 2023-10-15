import {
    AfterViewInit,
    Component,
    ElementRef, Input, OnDestroy,
    ViewChild,
} from '@angular/core';
import { faClose } from '@fortawesome/free-solid-svg-icons';
import { StateManager } from '../../../services/state-manager.service';

@Component({
  selector: 'modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements AfterViewInit, OnDestroy {
  @ViewChild('modalOverlay', { read: ElementRef })
  modalOverlay: ElementRef<HTMLElement>;

  @Input('modalOpened')
  modalOpened: boolean;

  faClose = faClose;

  constructor(private stateManager: StateManager) {
    console.log('modal constructed');
  }

  ngAfterViewInit(): void {
    console.log('Step 0..');
    if (this.modalOpened){
        console.log('ModalOpened: ', this.modalOpened);
        console.log('Step 1..');
        this.openModal();
    }
  }

  openModal() {
    this.modalOverlay
      .nativeElement
      .addEventListener('click', (event) =>
          this.closeModalEventHandler(event)
      );
    this.setModalStyle(false);
  }

  closeModal() {
    this.stateManager.emitModalOpened(false);
    this.setModalStyle(true);
  }

  closeModalEventHandler(event: Event) {
    const target = event.target as HTMLElement;
    if (target.classList.contains('overlay')) {
      this.closeModal();
    }
  }

  setModalStyle(onClose: boolean){
    this.modalOverlay.nativeElement.style.opacity = onClose ? '0': '1';
    this.modalOverlay.nativeElement.style.scale = onClose ? '0': '1';
    this.modalOverlay.nativeElement.style.backdropFilter = onClose ? 'blur(4px)' : 'blur(0)';
    this.modalOverlay.nativeElement.style.visibility = onClose ? 'hidden' : 'visible';
  }

  ngOnDestroy(): void {
    console.log('Modal destroyed..')
  }
}
