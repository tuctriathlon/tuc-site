import { Component, OnInit } from '@angular/core';
import {AuthService} from '../auth.service';
import {ActivatedRoute, Router} from '@angular/router';
import {FormBuilder, FormControl, FormGroup, ValidationErrors, Validators} from '@angular/forms';
import {ModalEnum} from '../../models/modal.enum';
import {ModalService} from '../../services/modal.service';

@Component({
  selector: 'app-reset-password',
  templateUrl: './reset-password.component.html',
  styleUrls: ['./reset-password.component.css']
})
export class ResetPasswordComponent implements OnInit {
  pwdForm: FormGroup;
  private token: string;
  constructor(private authService: AuthService,
              private modalService: ModalService,
              private router: Router,
              private route: ActivatedRoute,
              private formBuilder: FormBuilder) {
    this.pwdForm = formBuilder.group({
      pwd: new FormControl('', [Validators.required]),
      pwdConfirm: new FormControl('', [Validators.required])
    }, {validators: this.differentValidator});
  }

  ngOnInit(): void {
    this.route.queryParamMap.subscribe(params => {
      this.token = params.get('token');
      if (!this.token) {
        this.router.navigateByUrl('/');
        console.log('no token');
      }
    });
  }

  resetPwd() {
    const val = this.pwdForm.value;
    this.authService.resetPwd(this.token, val.pwd).subscribe(_ => {
      this.router.navigate(['/']).then(() => this.modalService.open(ModalEnum.LOGIN));
    });
  }

  private differentValidator(control: FormGroup): ValidationErrors | null {
    const pwd = control.get('pwd');
    const pwdConfirm = control.get('pwdConfirm');
    return pwd && pwdConfirm && pwd.value !== pwdConfirm.value ? { different: true } : null;
  }

}
