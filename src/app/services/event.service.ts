import { Injectable } from '@angular/core';
import {EventModel} from '../models/event.model';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private list: EventModel[];
  constructor() {
    this.list = [];
    this.generateMock();
  }

  /**
   * return events between indexes
   * @param start first index
   * @param end last index
   */
  getAll(start?: number, end?: number) {
    return this.list.slice(start, end);
  }

  /**
   * return element by its id
   * @param id
   */
  getById(id: number) {
    return this.list.find(e => e.id === id);
  }

  getCount(): number {
    return this.list.length;
  }

  /**
   * generate mock events
   */
  private generateMock() {
    this.list = Array.from({length: 50}, () =>
      EventModel.generateMock());
    this.list.forEach((event, index) => {
      event.id = index;
      event.date = event.date.subtract(index, 'days');
    });
    this.list.sort((a, b) =>  {
        if (b.date.isBefore(a.date)) {
          return -1;
        } else if (b.date.isAfter(a.date)) {
          return 1;
        } else {
          return 0;
        }
    });
  }
}
