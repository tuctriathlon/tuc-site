import { Injectable } from '@angular/core';
import {DirectusService} from '../../shared/directus.service';
import {UserModel} from './user.model';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {map, pluck} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class UserService extends DirectusService<UserModel> {

  constructor(private httpClient: HttpClient, ) {
    super(httpClient, UserModel, 'users');
  }

  get baseUrl(): string {
    return [environment.directusUrl, environment.directusProject, this.resourceName].join('/');
  }

  accepteInvitation(token: string): Observable<UserModel> {
    return this.post(`${this.baseUrl}/invite/${token}`, {});
  }

  invite(email: string[]): Observable<UserModel[]> {
    return this.postList(`${this.baseUrl}/invite`, {email});
  }

  /**
   * retrieve user data
   */
  getMe(): Observable<UserModel> {
    return this.http.get(this.baseUrl + '/me').pipe(
      pluck('data'),
      map<any, UserModel>(data => this.toSingleModel(data))
    );
  }

}
