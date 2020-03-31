import { Component } from '@angular/core';
import {EventModel} from './models/event.model';
import {EventService} from './services/event.service';
import {PageEvent} from '@angular/material/paginator';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  fillerNav = Array.from({length: 8}, (_, i) => {
    return {
      name: `Nav Item ${i + 1}`,
      link: ''
    };
  });

  events: EventModel[];
  constructor(public eventService: EventService) {
    this.fillerNav.unshift({name: 'Home2', link: '/home2'});
    this.fillerNav.unshift({name: 'Home', link: '/home'});
    this.events = eventService.getAll(0, PAGE_SIZE);
  }

  changePage(pageEvent: PageEvent) {
    const firstIndex = pageEvent.pageIndex * PAGE_SIZE;
    const lastIndex = firstIndex + PAGE_SIZE;
    this.events = this.eventService.getAll(firstIndex, lastIndex);
  }
}
