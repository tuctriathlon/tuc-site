import { Component, OnInit } from '@angular/core';
import {EventModel} from '../../models/event.model';
import {EventService} from '../../services/event.service';
import {PageEvent} from '@angular/material/paginator';

const PAGE_SIZE = 10;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

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