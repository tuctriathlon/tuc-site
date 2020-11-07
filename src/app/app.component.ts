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
import {PartenaireService} from '../partenaire/partenaire.service';
import {PartenaireModel} from '../partenaire/partenaire.model';
import {Location} from '@angular/common';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit, OnDestroy {
  fillerNav = [];
  menuItems$: Observable<PageModel[]>;
  partenaires$: Observable<PartenaireModel[]>;
  interval;
  partenaireIndex = 0;
  events: EventModel[];
  subscriptions: Subscription[] = [];
  fullScreen = false;
  constructor(private authService: AuthService,
              private modalService: ModalService,
              private pageService: PageService,
              private partenaireService: PartenaireService,
              private router: Router,
              private route: ActivatedRoute,
              public dialog: MatDialog,
              private location: Location) {
    this.interval = setInterval(() => this.partenaireIndex++, 5000);
  }

  ngOnInit(): void {
    this.subscriptions.push(this.authService.onLogin.subscribe(() => {
      this.menuItems$ = this.pageService.getRootPages();
    }));
    // open modals
    this.subscriptions.push(this.modalService.openedModal.subscribe(modal => {
      if (modal) {
        this.openDialog(modal);
      } else {
        this.dialog.closeAll();
      }
    }));
    // load menu items
    this.menuItems$ = this.pageService.getRootPages();
    // load partenaires for footer
    this.partenaires$ = this.partenaireService.getAll(true);
    // get parameter from url
    this.subscriptions.push(this.route.queryParamMap.subscribe(params => {
      if (params.has('embedded')) {
        this.fullScreen = true;
      }
    }));
  }

  /**
   * clear all subscriptions
   */
  ngOnDestroy() {
    this.subscriptions.forEach(s => s.unsubscribe());
    clearInterval(this.interval);
  }

  displayIndex(index): boolean {
    return index % 5 === this.partenaireIndex % 5
    || index + 1 % 5 === this.partenaireIndex % 5;
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
            id: 'login'
          });
        }
        break;
      case ModalEnum.FORGOTTEN_PASSWORD:
        if (!this.isLogged()) {
          this.dialog.open(ForgottenPasswordComponent, {
            id: 'forgotten-pwd'
          });
        }
        break;
      default:
        console.log(`unknown modal name ${name}`);
    }
  }

  navigateBack() {
    this.location.back();
  }
}
