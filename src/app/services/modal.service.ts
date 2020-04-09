import {Injectable} from '@angular/core';
import {Subject} from 'rxjs';
import {ModalEnum} from '../models/modal.enum';

@Injectable({
  providedIn: 'root'
})
export class ModalService {
  openedModal: Subject<ModalEnum>;
  constructor() {
    this.openedModal = new Subject<ModalEnum>();
  }

  /**
   * emit modal to open
   * @param modalName the modal Name
   */
  open(modalName: ModalEnum) {
    this.openedModal.next(modalName);
  }

  /**
   * emit null to close all modal
   */
  close() {
    this.openedModal.next(null);
  }
}
