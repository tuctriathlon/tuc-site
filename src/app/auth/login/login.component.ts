import {Component, OnInit} from '@angular/core';
import {AuthService} from '../auth.service';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {Router} from '@angular/router';
import {MatDialogRef} from '@angular/material/dialog';
import {ModalService} from '../../services/modal.service';
import {ModalEnum} from '../../models/modal.enum';
import {catchError} from 'rxjs/operators';
import {of} from 'rxjs';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  loginForm: UntypedFormGroup;
  error: string;
  constructor(private authService: AuthService,
              private modalService: ModalService,
              private fb: UntypedFormBuilder,
              private router: Router,
              public dialogRef: MatDialogRef<LoginComponent>) {
    this.loginForm = this.fb.group({
      email: new UntypedFormControl('', [Validators.required, Validators.email]),
      password: new UntypedFormControl('')
    });
  }

  ngOnInit(): void {

  }

  login() {
    const val = this.loginForm.value;
    this.loginForm.updateValueAndValidity();
    if (this.loginForm.valid) {
      this.authService.login({ email: val.email, password: val.password })
        .pipe(
          catchError(err => of(err))
        )
        .subscribe(
          async (isLogged) => {
            if (isLogged) {
              await this.router.navigateByUrl(this.authService.redirectUrl);
              this.dialogRef.close();
            } else {
              this.error = 'wrong credentials';
            }
          }
        );
    }
  }

  resetPwd() {
    this.modalService.open(ModalEnum.FORGOTTEN_PASSWORD);
    this.dialogRef.close();
  }

}
