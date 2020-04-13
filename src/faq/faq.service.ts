import { Injectable } from '@angular/core';
import {DirectusService} from '../shared/directus.service';
import {FaqModel} from './faq.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class FaqService extends DirectusService<FaqModel> {

  constructor(private httpClient: HttpClient) {
    super(httpClient, FaqModel, 'faq');
  }
}
