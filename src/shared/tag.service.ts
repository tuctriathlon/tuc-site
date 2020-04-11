import { Injectable } from '@angular/core';
import {DirectusService} from './directus.service';
import {TagModel} from './tag.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TagService extends DirectusService<TagModel> {

  constructor(private httpClient: HttpClient) {
    super(httpClient, () => new TagModel(), 'tag');
  }
}
