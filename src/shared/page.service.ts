import { Injectable } from '@angular/core';
import {DirectusService} from './directus.service';
import {PageModel} from './directus-page/page.model';
import {HttpClient, HttpParams} from '@angular/common/http';
import {Observable} from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class PageService extends DirectusService<PageModel> {

  constructor(private httpClient: HttpClient) {
    super(httpClient, PageModel, 'page');
  }

  getByUrl(url: string): Observable<PageModel> {
    const params = new HttpParams().set('filter[url]', url);
    return this.get(this.baseUrl, {params});
  }
}
