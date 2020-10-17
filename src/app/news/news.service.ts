import { Injectable } from '@angular/core';
import {DirectusService} from '../../shared/directus.service';
import {NewsModel} from './news.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class NewsService extends DirectusService<NewsModel> {

  constructor(public http: HttpClient) {
    super(http, NewsModel, 'news');
  }
}
