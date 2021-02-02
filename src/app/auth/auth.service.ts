import {Injectable} from '@angular/core';
import {catchError, mapTo, pluck, share, shareReplay, tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {BehaviorSubject, Observable, of} from 'rxjs';
import {environment} from '../../environments/environment';
import {StorageService} from '../../shared/storage.service';
import {ActivatedRoute} from '@angular/router';
import {utc} from 'moment';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  private readonly JWT_TOKEN = 'JWT_TOKEN';
  private readonly REFRESH_TOKEN = 'REFRESH_TOKEN';
  // cf documentation directus 20min
  private readonly TOKEN_EXPIRATION_TIME = 10 * 60;
  private embedded = false;
  // url to redirect after login
  redirectUrl: string;
  onLogin: BehaviorSubject<boolean> =  new BehaviorSubject(false);

  get serviceUrl() {
    return [environment.directusUrl, environment.directusProject, 'auth'].join('/');
  }

  get isEmbedded(): boolean {
    return this.embedded;
  }

  set isEmbedded(value: boolean) {
    this.embedded = value;
  }

  constructor(private http: HttpClient,
              private storage: StorageService,
              private route: ActivatedRoute) {
    this.redirectUrl = '/home';
    this.init();
  }

  /**
   * init service with query params
   */
  init(): void {
    this.route.queryParamMap.subscribe(params => {
      if (params.has('embedded')) {
        this.isEmbedded = true;
      }
      if (params.has('token') && params.get('token')) {
        this.setSession(params.get('token'));
        this.onLogin.next(true);
      }
    });
    this.onLogin.next(!!this.getJwtToken());
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
        catchError(() => {
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
    return utc().isBefore(this.getExpiration());
  }

  /**
   * refresh current token
   */
  refreshToken() {
    return this.http.post<any>(`${this.serviceUrl}/refresh`, {
      token: this.getJwtToken()
    }).pipe(
      share(),
      pluck('data'),
      tap((data) => {
        this.onLogin.next(true);
        this.setSession(data.token);
      }),
      catchError(() => {
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
    return this.storage.getItem(this.JWT_TOKEN);
  }

  /**
   * send an mail to the user with the password token
   * @param email user email
   */
  requestPwd(email: string) {
    return this.http.post<any>(`${this.serviceUrl}/password/request`, {
      email,
      reset_url: 'https://www.tuc-triathlon.com/#/reset-password'
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
    }).pipe(
      tap(() => this.logout())
    );
  }

  /**
   * return token expiration date
   */
  private getExpiration() {
    const expiration = this.storage.getItem(this.REFRESH_TOKEN);
    const expiresAt = JSON.parse(expiration);
    return utc(expiresAt);
  }

  /**
   * set session parameter in local storage
   * @param token the user token
   */
  public setSession(token: string) {
    const expiresAt = utc().add(this.TOKEN_EXPIRATION_TIME, 'second');
    this.storage.setItem(this.JWT_TOKEN, token);
    this.storage.setItem(this.REFRESH_TOKEN, JSON.stringify(expiresAt.valueOf()) );
  }

  /**
   * clear local storage session parameter
   */
  private removeTokens() {
    this.storage.removeItem(this.JWT_TOKEN);
    this.storage.removeItem(this.REFRESH_TOKEN);
  }
}
