import {Component, OnInit} from '@angular/core';
import {EventModel} from './models/event.model';
import {LoginComponent} from '../auth/login/login.component';
import {MatDialog} from '@angular/material/dialog';
import {AuthService} from '../auth/auth.service';
import {ForgottenPasswordComponent} from '../auth/forgotten-password/forgotten-password.component';
import {ModalService} from './services/modal.service';
import {ModalEnum} from './models/modal.enum';
import {Router} from '@angular/router';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  fillerNav = [];

  events: EventModel[];
  constructor(private authService: AuthService,
              private modalService: ModalService,
              private router: Router,
              public dialog: MatDialog) {
    this.fillerNav.push({name: 'Home', link: '/home', icon: 'home'});
    this.fillerNav.push({name: 'Home2', link: '/home2', icon: 'home'});
    this.fillerNav.push({name: 'Training', link: '/training', icon: 'dumbbell'});
    this.fillerNav.push({name: 'Test', link: '/test', icon: 'vial'});
  }

  ngOnInit(): void {
    this.modalService.openedModal.subscribe(modal => {
      if (modal) {
        this.openDialog(modal);
      } else {
        this.dialog.closeAll();
      }
    });
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
