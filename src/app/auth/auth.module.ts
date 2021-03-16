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
import {SharedModule} from '../../shared/shared.module';
import {InviteUserComponent} from './invite-user/invite-user.component';
import {MatRadioModule} from '@angular/material/radio';
import {UserInfoComponent} from './user-info/user-info.component';
import {AuthGuard} from './authGuard';
import {StoreModule} from '@ngrx/store';
import {authReducer} from './auth.reducer';


const authRoutes: Routes = [
  { path: 'reset-password', component: ResetPasswordComponent},
  { path: 'invite', component: InviteUserComponent},
  { path: 'user/:id', component: UserInfoComponent, canActivate: [AuthGuard]},
  { path: 'user', component: UserInfoComponent, canActivate: [AuthGuard]},
];

@NgModule({
  declarations: [
    LoginComponent,
    ForgottenPasswordComponent,
    ResetPasswordComponent,
    InviteUserComponent,
    UserInfoComponent
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
    FormsModule,
    MatRadioModule,
    StoreModule.forRoot({auth: authReducer})
  ],
  exports: [
    LoginComponent,
    ForgottenPasswordComponent
  ]
})
export class AuthModule { }
