import {ActivatedRouteSnapshot, CanActivate, RouterStateSnapshot} from '@angular/router';
import {Injectable} from '@angular/core';
import {AuthService} from './auth.service';
import {ModalService} from '../services/modal.service';
import {ModalEnum} from '../models/modal.enum';

@Injectable({
  providedIn: 'root'
})
export class AuthGuard implements CanActivate {

  constructor(private authService: AuthService,
              private modalService: ModalService) { }

  canActivate(route: ActivatedRouteSnapshot,
              state: RouterStateSnapshot): boolean {
    if (!this.authService.isLoggedIn()) {
      this.authService.redirectUrl = state.url;
      this.modalService.open(ModalEnum.LOGIN);
    }
    return this.authService.isLoggedIn();
  }

}
