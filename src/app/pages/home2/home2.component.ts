import { Component, OnInit } from '@angular/core';
import {EventModel} from '../../models/event.model';
import {EventService} from '../../services/event.service';
import {PageEvent} from '@angular/material/paginator';

const PAGE_SIZE = 12;

@Component({
  selector: 'app-home2',
  templateUrl: './home2.component.html',
  styleUrls: ['./home2.component.css']
})
export class Home2Component implements OnInit {

  events: EventModel[];
  constructor(public eventService: EventService) {
    this.events = eventService.getAll(0, PAGE_SIZE);
  }

  changePage(pageEvent: PageEvent) {
    const firstIndex = pageEvent.pageIndex * PAGE_SIZE;
    const lastIndex = firstIndex + PAGE_SIZE;
    this.events = this.eventService.getAll(firstIndex, lastIndex);
  }

  ngOnInit(): void {
  }

}
