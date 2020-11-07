import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {UserModel} from '../user.model';
import {switchMap} from 'rxjs/operators';
import {combineLatest, Observable} from 'rxjs';
import {Router} from '@angular/router';

@Component({
  selector: 'app-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.css']
})
export class InviteUserComponent implements OnInit {
  users$: Observable<UserModel[]>;
  emailsCSV = '';
  errors: string[] = [];

  constructor(private userService: UserService,
              private router: Router) {
  }

  ngOnInit(): void {}

  get emails(): string[] {
    return this.emailsCSV.split(',').map(mail => mail.trim());
  }

  inviteUsers() {
    return this.userService.invite(this.emails).pipe(
      switchMap(users => combineLatest(
        users.map(user => this.userService.updateItem(user.id, {role: 7})))
      ));
  }

  async sendInvitations() {
    this.inviteUsers().toPromise().then(() => {
      this.router.navigateByUrl('home').then(() => console.log('invitation send'));
    });
  }

}
