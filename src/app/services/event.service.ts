import { Injectable } from '@angular/core';
import {EventModel} from '../models/event.model';
import {Observable, of} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class EventService {
  private list: EventModel[];
  constructor() {
    this.list = [];
  }

  /**
   * return events between indexes
   * @param start first index
   * @param end last index
   */
  getAll(start?: number, end?: number): Observable<EventModel[]> {
    return of(this.list.slice(start, end));
  }

  /**
   * return element by its id
   * @param id of item
   */
  getById(id: number) {
    return this.list.find(e => e.id === id);
  }

  getCount(): number {
    return this.list.length;
  }
}
