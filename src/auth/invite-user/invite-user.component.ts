import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {UserModel} from '../user.model';
import {switchMap} from 'rxjs/operators';
import {combineLatest, Observable} from 'rxjs';
import {RoleService} from '../../app/services/role.service';
import {RoleModel} from '../../app/models/role.model';

@Component({
  selector: 'app-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.css']
})
export class InviteUserComponent implements OnInit {
  users$: Observable<UserModel[]>;
  emailsCSV = '';
  errors: string[] = [];
  roles$: Observable<RoleModel[]>;
  selectedRole = 4; // role licencié

  constructor(private userService: UserService,
              private roleService: RoleService) {
  }

  ngOnInit(): void {
    this.roles$ = this.roleService.getAll();
  }

  get emails(): string[] {
    return this.emailsCSV.split(',').map(mail => mail.trim());
  }

  inviteUsers() {
    return this.userService.invite(this.emails).pipe(
      switchMap(users => combineLatest(
        users.map(user => this.userService.updateItem(user.id, {role: this.selectedRole})))
      ));
  }

  async sendInvitations() {
    this.inviteUsers().toPromise().then(() => {
      this.emailsCSV = '';
    });
  }
}
