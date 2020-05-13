import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {PageModel} from '../../shared/directus-page/page.model';
import {UserModel} from '../user.model';
import {switchMap} from 'rxjs/operators';
import {UserService} from '../user.service';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {
  userForm: FormGroup;
  token: string;
  page: PageModel;
  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private authService: AuthService,
              private formBuilder: FormBuilder) {
    this.page = new UserModel().toPage();
    this.userForm = this.formBuilder.group({
      firstName: new FormControl('', [Validators.required]),
      lastName: new FormControl('', [Validators.required]),
      password: new FormControl('', [Validators.required]),
      confirmPassword: new FormControl('', [Validators.required])
    }, {validators: this.differentValidator});
  }

  ngOnInit(): void {
    this.route.paramMap.pipe(
      switchMap(params => {
        this.token = params.get('token');
        this.authService.setSession(this.token);
        return this.userService.accepteInvitation(this.token);
      })
    ).subscribe(user => {
      this.userForm.patchValue({
        firstName: user.firstName,
        lastName: user.lastName
      });
    });

  }

  private differentValidator(control: FormGroup): ValidationErrors | null {
    const pwd = control.get('password');
    const pwdConfirm = control.get('confirmPassword');
    return pwd && pwdConfirm && pwd.value !== pwdConfirm.value ? { different: true } : null;
  }

  save() {
    const userData: any = {id: 15};
    userData.first_name = 'Francis';
    this.userService.updateItem(userData.id, userData).subscribe();
  }

  get jwtToken() {
    return this.authService.getJwtToken();
  }

}
