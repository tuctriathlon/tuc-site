import { Component, OnInit } from '@angular/core';
import {EventModel} from '../../models/event.model';
import {EventService} from '../../services/event.service';
import {PageEvent} from '@angular/material/paginator';
import {CompteRenduService} from '../../../compte-rendu/compte-rendu.service';
import {forkJoin, Observable} from 'rxjs';
import {CardInterface} from '../../../shared/card/card.interface';
import { map } from 'rxjs/operators';
import {flatMap} from 'lodash';

const PAGE_SIZE = 9;

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  events: EventModel[];
  cr$: Observable<CardInterface[]>;
  constructor(public eventService: EventService,
              public compteRenduService: CompteRenduService) {
    this.loadItems();
  }

  changePage(pageEvent: PageEvent) {
    const firstIndex = pageEvent.pageIndex * PAGE_SIZE;
    const lastIndex = firstIndex + PAGE_SIZE;
    this.loadItems(firstIndex, lastIndex);
  }

  loadItems(firstIndex: number = 0, lastIndex: number = PAGE_SIZE) {
    this.cr$ = this.compteRenduService.getAll(true, {sort: ['-date']});
  }

  ngOnInit(): void {
  }

}
