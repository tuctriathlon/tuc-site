import { Injectable } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class StorageService {
  private storage: Storage;
  constructor(private route: ActivatedRoute) {
    this.route.queryParamMap.subscribe(qParams => {
      if (!qParams.has('embedded')) {
        this.storage = localStorage;
      }
    });
  }

  getItem(key: string) {
    return this.storage ? this.storage.getItem(key) : null;
  }

  setItem(key: string, value: string) {
    return this.storage ? this.storage.setItem(key, value) : null;
  }

  removeItem(key: string) {
    return this.storage ? this.storage.removeItem(key) : null;
  }
}
