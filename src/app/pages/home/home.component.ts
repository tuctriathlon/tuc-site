import { Component, OnInit } from '@angular/core';
import {EventModel} from '../../models/event.model';
import {EventService} from '../../services/event.service';
import {CompteRenduService} from '../../../compte-rendu/compte-rendu.service';
import {Observable} from 'rxjs';
import {CardInterface} from '../../../shared/card/card.interface';
import {NewsModel} from '../../news/news.model';
import {NewsService} from '../../news/news.service';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  events: EventModel[];
  cr$: Observable<CardInterface[]>;
  news$: Observable<NewsModel[]>;
  constructor(public eventService: EventService,
              public compteRenduService: CompteRenduService,
              private newsService: NewsService) {
    this.loadItems();
  }

  loadItems() {
    this.cr$ = this.compteRenduService.getAll(true, {sort: ['-date'], limit: 7});
    this.news$ = this.newsService.getAll(true, {sort: ['-date'], limit: 3});
  }

  ngOnInit(): void {
  }

}
