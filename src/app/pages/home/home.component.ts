import { Component, OnInit } from '@angular/core';
import {EventModel} from '../../models/event.model';
import {EventService} from '../../services/event.service';
import {CompteRenduService} from '../../../compte-rendu/compte-rendu.service';
import {Observable} from 'rxjs';
import {CardInterface} from '../../../shared/card/card.interface';

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

  loadItems() {
    this.cr$ = this.compteRenduService.getAll(true, {sort: ['-date'], limit: 9});
  }

  ngOnInit(): void {
  }

}
