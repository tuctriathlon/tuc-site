import {NgModule} from '@angular/core';
import {CommonModule} from '@angular/common';
import {MailPageComponent} from './mail-page/mail-page.component';
import {EditorModule, TINYMCE_SCRIPT_SRC} from '@tinymce/tinymce-angular';
import {RouterModule, Routes} from '@angular/router';
import {MatAutocompleteModule} from '@angular/material/autocomplete';
import {MatInputModule} from '@angular/material/input';
import {ReactiveFormsModule} from '@angular/forms';
import {MatButtonModule} from '@angular/material/button';
import {AuthGuard} from '../auth/authGuard';

const routes: Routes = [
  {path: 'mail', component: MailPageComponent, canActivate: [AuthGuard]},
];

@NgModule({
  declarations: [MailPageComponent],
  imports: [
    CommonModule,
    EditorModule,
    MatAutocompleteModule,
    RouterModule.forChild(routes),
    MatInputModule,
    ReactiveFormsModule,
    MatButtonModule
  ],
  providers: [
    { provide: TINYMCE_SCRIPT_SRC, useValue: 'tinymce/tinymce.min.js' }
  ],
  exports: [
    RouterModule
  ]
})
export class MailModule { }
