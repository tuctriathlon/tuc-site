import {Component, OnInit} from '@angular/core';
import {FormBuilder, FormControl, FormGroup, Validators} from '@angular/forms';
import {AuthService} from '../auth.service';
import {MatDialogRef} from '@angular/material/dialog';
import {ModalService} from '../../app/services/modal.service';
import {ModalEnum} from '../../app/models/modal.enum';

@Component({
  selector: 'app-forgotten-password',
  templateUrl: './forgotten-password.component.html',
  styleUrls: ['./forgotten-password.component.css']
})
export class ForgottenPasswordComponent implements OnInit {
  form: FormGroup;
  constructor(private authService: AuthService,
              private modalService: ModalService,
              private fb: FormBuilder,
              public dialogRef: MatDialogRef<ForgottenPasswordComponent>) {
    this.form = this.fb.group({
      email: new FormControl('', [Validators.required, Validators.email])
    });
  }

  ngOnInit(): void {
  }

  requestPwd() {
    const val = this.form.value;
    this.authService.requestPwd(val.email).subscribe(_ => {
      // TODO send message
      this.dialogRef.close();
    });
  }

  openLogin() {
    this.modalService.open(ModalEnum.LOGIN);
  }

}
