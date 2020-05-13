import {Injectable} from '@angular/core';
import {catchError, mapTo, pluck, shareReplay, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {environment} from '../environments/environment';
import * as moment from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  // cf documentation directus 20min
  private readonly TOKEN_EXPIRATION_TIME = 20 * 60;
  // url to redirect after login
  redirectUrl: string;
  onLogin: BehaviorSubject<boolean> =  new BehaviorSubject(false);

  get serviceUrl() {
    return [environment.directusUrl, environment.directusProject, 'auth'].join('/');
  }

  constructor(private http: HttpClient) {
    this.redirectUrl = '/home';
  }

  /**
   * get new user token
   * @param user contains email and password
   */
  login(user: { email: string, password: string }): Observable<boolean> {
    return this.http.post<any>(`${this.serviceUrl}/authenticate`, user)
      .pipe(
        pluck('data'),
        tap(({token}) => {
          this.setSession(token);
          this.onLogin.next(true);
        }),
        mapTo(true),
        shareReplay(),
        catchError(error => {
          alert(error.error);
          return of(false);
        }));
  }

  /**
   * close user session
   */
  logout() {
    this.removeTokens();
    this.onLogin.next(false);
  }

  /**
   * return if user is logged
   */
  isLoggedIn() {
    return moment().isBefore(this.getExpiration());
  }

  /**
   * refresh current token
   */
  refreshToken() {
    return this.http.post<any>(`${this.serviceUrl}/refresh`, {
      token: this.getJwtToken()
    }).pipe(
      pluck('data'),
      tap((data) => {
        this.onLogin.next(true);
        this.setSession(data.token);
      }),
    catchError(err => {
        console.log(err);
        this.onLogin.next(false);
        this.logout();
        return of(false);
      })
    );
  }

  /**
   * return current token
   */
  getJwtToken() {
    return localStorage.getItem(this.JWT_TOKEN);
  }

  /**
   * send an mail to the user with the password token
   * @param email user email
   */
  requestPwd(email: string) {
    return this.http.post<any>(`${this.serviceUrl}/password/request`, {
      email,
      reset_url: 'http://demo.tuc-triathlon.com/reset-password'
    });
  }

  /**
   * set user password after a reset request
   * @param token lost password token
   * @param password new password
   */
  resetPwd(token, password) {
    return this.http.post(`${this.serviceUrl}/password/reset`, {
      token,
      password
    });
  }

  /**
   * return token expiration date
   */
  private getExpiration() {
    const expiration = localStorage.getItem(this.REFRESH_TOKEN);
    const expiresAt = JSON.parse(expiration);
    return moment(expiresAt);
  }

  /**
   * set session parameter in local storage
   * @param token the user token
   */
  public setSession(token: string) {
    const expiresAt = moment().add(this.TOKEN_EXPIRATION_TIME, 'second');
    localStorage.setItem(this.JWT_TOKEN, token);
    localStorage.setItem(this.REFRESH_TOKEN, JSON.stringify(expiresAt.valueOf()) );
  }

  /**
   * clear local storage session parameter
   */
  private removeTokens() {
    localStorage.removeItem(this.JWT_TOKEN);
    localStorage.removeItem(this.REFRESH_TOKEN);
  }
}
