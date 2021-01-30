import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {UserModel, UserStatus} from '../user.model';
import {Observable, of, zip} from 'rxjs';
import {RoleService} from '../../services/role.service';
import {RoleModel} from '../../models/role.model';
import {map, mergeMap, tap} from 'rxjs/operators';
import {MailService} from '../../mail/mail.service';

@Component({
  selector: 'app-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.css']
})
export class InviteUserComponent implements OnInit {
  users$: Observable<Partial<User2Create>[]>;
  emailsCSV = '';
  errors: string[] = [];
  roles$: Observable<RoleModel[]>;
  selectedRole = 4; // role licencié
  text: any ;
  usersToAdd: Partial<User2Create>[] = [];

  constructor(private userService: UserService,
              private roleService: RoleService,
              private mailService: MailService) {
  }

  ngOnInit(): void {
    this.roles$ = this.roleService.getAll();
  }


  inviteUsers() {
    this.users$ = this.userService.checkIfExist(this.usersToAdd.map( u => u.email)).pipe(
      mergeMap(users => {
        const createUsers = this.usersToAdd.filter(user => !users.find(u => u.email === user.email)).map(u => of(u));
        return zip(...createUsers);
      }),
      tap(data => console.log(data)),
      mergeMap(createdUsers => {
        const sendMails = createdUsers.map(user =>
          this.mailService.createAccountMail(user.email, `${user.first_name} ${user.last_name}`)
          .pipe(
            map(() => user)
          ));
        return zip(...sendMails);
      })
    );
  }


  csvJSON(csvText): void {
    const lines = csvText.split('\n');
    this.usersToAdd = [];
    const headers = lines[0].split(',').map(header => header.trim());
    lines.shift();
    lines.forEach(line => {
      const obj = {};
      const currentLine = line.split(',');
      headers.forEach((header, i) => {
        if (currentLine[i]) {
          obj[header] = currentLine[i].trim();
        }
      });
      this.usersToAdd.push({
        ...obj,
        creationStatus: 'toCreate',
        status: UserStatus.ACTIVE,
        role: this.selectedRole,
        password: this.passwordGenerator()
      });
    });
    this.usersToAdd = this.usersToAdd.filter((user, index, self) =>
      user.email && self.findIndex(u => u.email === user.email) === index
    );
  }

  convertFile(input) {
    const reader = new FileReader();
    reader.readAsText(input.files[0]);
    reader.onload = () => {
      const text = reader.result;
      this.text = text;
      this.csvJSON(text);
    };

  }

  private passwordGenerator( length: number = 8 ) {
    const string = 'abcdefghijklmnopqrstuvwxyz';
    const numeric = '0123456789';
    const punctuation = '!@#$%^&*()_+~`|}{[]\:;?><,./-=';
    let password = '';
    let character = '';
    while ( password.length < length ) {
      const entity1 = Math.ceil(string.length * Math.random() * Math.random());
      const entity2 = Math.ceil(numeric.length * Math.random() * Math.random());
      const entity3 = Math.ceil(punctuation.length * Math.random() * Math.random());
      let hold = string.charAt( entity1 );
      hold = (password.length % 2 === 0) ? (hold.toUpperCase()) : hold;
      character += hold;
      character += numeric.charAt( entity2 );
      character += punctuation.charAt( entity3 );
      password = character;
    }
    password = password.split('').sort(() => 0.5 - Math.random()).join('');
    return password.substr(0, length);
  }
}

export interface User2Create extends UserModel {
  creationStatus: 'toCreate'| 'alreadyExist' | 'created' | 'error';
}
