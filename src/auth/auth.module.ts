import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {AuthInterceptor} from './auth.interceptor';
import {HTTP_INTERCEPTORS} from '@angular/common/http';
import { LoginComponent } from './login/login.component';
import {ReactiveFormsModule} from '@angular/forms';
import { ForgottenPasswordComponent } from './forgotten-password/forgotten-password.component';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {RouterModule, Routes} from '@angular/router';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatDialogModule} from '@angular/material/dialog';

const authRoutes: Routes = [
  { path: 'reset-password', component: ResetPasswordComponent},
];

@NgModule({
  declarations: [
    LoginComponent,
    ForgottenPasswordComponent,
    ResetPasswordComponent
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
    RouterModule.forChild(authRoutes)
  ],
  exports: [
    LoginComponent,
    ForgottenPasswordComponent
  ]
})
export class AuthModule { }
