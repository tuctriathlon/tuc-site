import { Injectable } from '@angular/core';
import {DirectusService} from './directus.service';
import {PoleModel} from './pole.model';
import {HttpClient} from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class PoleService extends DirectusService<PoleModel> {

  constructor(private httpClient: HttpClient) {
    super(httpClient, PoleModel, 'pole');
  }
}
