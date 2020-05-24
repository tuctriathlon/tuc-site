import {Component, OnDestroy, OnInit} from '@angular/core';
import {EventModel} from './models/event.model';
import {LoginComponent} from '../auth/login/login.component';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '../auth/auth.service';
import {ForgottenPasswordComponent} from '../auth/forgotten-password/forgotten-password.component';
import {ModalService} from './services/modal.service';
import {ModalEnum} from './models/modal.enum';
import {ActivatedRoute, Router} from '@angular/router';
import {PageService} from '../shared/directus-page/page.service';
import {Observable, Subscription} from 'rxjs';
import {PageModel} from '../shared/directus-page/page.model';
import {FooterService} from './footer.service';
import {FooterModel} from './models/Footer.model';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  fillerNav = [];
  menuItems$: Observable<PageModel[]>;
  links$: Observable<FooterModel[]>;
  events: EventModel[];
  subscriptions: Subscription[] = [];
  fullScreen = false;
  constructor(private authService: AuthService,
              private modalService: ModalService,
              private pageService: PageService,
              private footerService: FooterService,
              private router: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog) {
  }

  ngOnInit(): void {
    if (this.authService.getJwtToken()) {
      this.subscriptions.push(this.authService.refreshToken().subscribe(_ => {
        console.log('connecté');
      }));
    }
    this.subscriptions.push(this.authService.onLogin.subscribe(() => {
      this.menuItems$ = this.pageService.getRootPages();
    }));
    this.links$ = this.footerService.getAll();
    this.subscriptions.push(this.modalService.openedModal.subscribe(modal => {
      if (modal) {
        this.openDialog(modal);
      } else {
        this.dialog.closeAll();
      }
    }));
    this.menuItems$ = this.pageService.getRootPages();
    this.route.queryParamMap.subscribe(params => {
      if (params.has('embedded')) {
        this.fullScreen = true;
      }
    });
  }

  /**
   * clear all subscriptions
   */
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
  }

  isLogged() {
    return this.authService.isLoggedIn();
  }

  logout() {
    this.router.navigate(['/']).then(() => {
      this.authService.logout();
    });
  }

  openDialog(name: ModalEnum | string): void {
    switch (name) {
      case ModalEnum.LOGIN:
        if (!this.isLogged()) {
          this.dialog.open(LoginComponent, {
            id: 'login',
            width: '400px'
          });
        }
        break;
      case ModalEnum.FORGOTTEN_PASSWORD:
        if (!this.isLogged()) {
          this.dialog.open(ForgottenPasswordComponent, {
            id: 'forgotten-pwd',
            width: '400px'
          });
        }
        break;
      default:
        console.log(`unknown modal name ${name}`);
    }
  }
}
