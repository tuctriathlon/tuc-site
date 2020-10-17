import { Component, OnInit } from '@angular/core';
import {NewsService} from '../news.service';
import {Observable} from 'rxjs';
import {NewsModel} from '../news.model';
import {PageModel} from '../../../shared/directus-page/page.model';

@Component({
  selector: 'app-news-page',
  templateUrl: './news-page.component.html',
  styleUrls: ['./news-page.component.css']
})
export class NewsPageComponent implements OnInit {
  page: PageModel;
  news$: Observable<NewsModel[]>;
  constructor(private newsService: NewsService) { }

  ngOnInit(): void {
    this.page = new PageModel({title: 'News', icon: 'newspaper'});
    this.news$ = this.newsService.getAll(false, {sort: ['-date'], limit: 50});
  }

}
