import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {UserModel, UserStatus} from '../user.model';
import { map, switchMap} from 'rxjs/operators';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.css']
})
export class InviteUserComponent implements OnInit {
  emails: string[] = [];
  users$: Observable<UserModel[]>;

  constructor(private userService: UserService) {
  }

  ngOnInit(): void {
    this.users$ = this.getAllInvitedUsers();
  }

  getAllInvitedUsers(): Observable<UserModel[]> {
    return this.userService.getAll().pipe(
      map(users => users.filter(user => user.status === UserStatus.ACTIVE))
    );
  }

  createUser(email: string) {
    this.userService.invite(email).pipe(
      switchMap(user => {
        console.log(user);
        return this.userService.updateItem(user.id, { email: user.email.trim()});
      })
    ).subscribe(() => {
    });
  }

  updateUser(user: UserModel) {
    this.userService.updateItem(user.id, {role: 7, status: UserStatus.ACTIVE, password: 'tuc123', email: user.email.trim()})
      .subscribe(u => {
      user = u;
    });
  }

  deleteUser(user: UserModel) {
    this.userService.deleteItem(user.id).subscribe(() => console.log(`${user.id} user deleted`));
  }

}
