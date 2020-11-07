import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {AuthInterceptor} from './auth.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import {LoginComponent} from './login/login.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {ForgottenPasswordComponent} from './forgotten-password/forgotten-password.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule, Routes} from '@angular/router';
import {ResetPasswordComponent} from './reset-password/reset-password.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatDialogModule} from '@angular/material/dialog';
import {InviteComponent} from './invite/invite.component';
import {SharedModule} from '../shared/shared.module';
import {InviteUserComponent} from './invite-user/invite-user.component';

const authRoutes: Routes = [
  { path: 'reset-password', component: ResetPasswordComponent},
  { path: 'invite/:token', component: InviteComponent},
  { path: 'invite', component: InviteUserComponent},
];

@NgModule({
  declarations: [
    LoginComponent,
    ForgottenPasswordComponent,
    ResetPasswordComponent,
    InviteComponent,
    InviteUserComponent
  ],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: AuthInterceptor,
      multi: true
    }
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    RouterModule,
    FontAwesomeModule,
    MatDialogModule,
    RouterModule.forChild(authRoutes),
    SharedModule,
    FormsModule
  ],
  exports: [
    LoginComponent,
    ForgottenPasswordComponent,
    InviteComponent
  ]
})
export class AuthModule { }
