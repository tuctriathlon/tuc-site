import { Injectable } from '@angular/core';
import {DirectusService} from '../../shared/directus.service';
import {RoleModel} from '../models/role.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RoleService extends DirectusService<RoleModel> {

  constructor(http: HttpClient) {
    super(http, RoleModel, 'roles');
  }

  get baseUrl(): string {
    return [environment.directusUrl, environment.directusProject, this.resourceName].join('/');
  }
}
