import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {DirectusService} from './directus.service';
import {TestModel} from '../models/test.model';


@Injectable({
  providedIn: 'root'
})
export class TestService extends DirectusService<TestModel> {
  constructor(protected http: HttpClient) {
    super(http, 'test');
  }

}
