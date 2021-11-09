import {Component, OnInit} from '@angular/core';
import {UserService} from '../user.service';
import {UserModel, UserStatus} from '../user.model';
import {Observable} from 'rxjs';
import {RoleService} from '../../services/role.service';
import {RoleModel} from '../../models/role.model';
import {MailService} from '../../mail/mail.service';

@Component({
  selector: 'app-invite-user',
  templateUrl: './invite-user.component.html',
  styleUrls: ['./invite-user.component.css']
})
export class InviteUserComponent implements OnInit {
  users$: Observable<UserModel[]>;
  errors: string[] = [];
  roles$: Observable<RoleModel[]>;
  selectedRole = 4; // role licencié
  text: any ;
  usersToAdd: UserModel[] = [];

  constructor(private userService: UserService,
              private roleService: RoleService,
              private mailService: MailService) {
  }

  ngOnInit(): void {
    this.roles$ = this.roleService.getAll();
  }


  /**
   * créer les utilisateurs et envoie le mail d'invitation
   * les utilisateurs deja existant sont filtrés
   */
  inviteUsers() {
    const creation = new Promise<void>(async (resolve) => {
      for (const user of this.usersToAdd) {
        const u = await this.userService.checkIfExist([user.email]).toPromise();
        // si l'utlisateur n'existe pas
        if (!u.length) {
          // creation de l'utilisateur
          await this.userService.addItem(user);
          // envoie de l'email d'invitation
          await this.mailService.createAccountMail(user.email, `${user.first_name} ${user.last_name}`);
        }
      }
      resolve();
    });
    creation.then(() => this.usersToAdd = []);
  }


  /**
   * parse le csv pour definir la liste d'ulitsateur présent dedans
   * @param csvText contenue du fichier
   */
  csvJSON(csvText: string): void {
    const lines = csvText.split('\n');
    this.usersToAdd = [];
    const headers = lines[0].split(',')
      // format l'entete des colonnes
      .map(header => this.toCamelCase(header.trim().replace(/[éèêë]/, 'e')))
      // remplace les entetes par leur equivalents en BDD
      .map(header => {
        switch (header) {
          case 'prenom':
            return 'first_name';
          case 'prénom':
            return 'first_name';
          case'nom':
            return 'last_name';
          default:
            return header;
        }
      });
    lines.shift();
    lines.forEach(line => {
      const obj = {};
      const currentLine = line.split(',');
      headers.forEach((header, i) => {
        if (currentLine[i]) {
          obj[header] = currentLine[i].trim();
        }
      });

      this.usersToAdd.push(new UserModel({
        ...obj,
        status: UserStatus.ACTIVE,
        role: this.selectedRole,
        password: this.passwordGenerator()
      }));
    });
    // retrait des doublons mails
    // 1 utilisateur = 1 adresse mail
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
      this.csvJSON(text as string);
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

  private toCamelCase(text: string): string {
    return text
      .replace(/(?:^\w|[A-Z]|\b\w)/g, (leftTrim: string, index: number) =>
        index === 0 ? leftTrim.toLowerCase() : leftTrim.toUpperCase(),
      )
      .replace(/\s+/g, '');
  }
}

