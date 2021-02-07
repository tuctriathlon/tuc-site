import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MailPageComponent } from './mail-page/mail-page.component';
import {EditorModule} from '@tinymce/tinymce-angular';



@NgModule({
  declarations: [MailPageComponent],
  imports: [
    CommonModule,
    EditorModule
  ]
})
export class MailModule { }
