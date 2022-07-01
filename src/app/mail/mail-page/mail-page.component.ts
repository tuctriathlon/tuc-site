import {Component, OnInit} from '@angular/core';
import {debounceTime, startWith, switchMap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {UntypedFormBuilder, UntypedFormControl, UntypedFormGroup, Validators} from '@angular/forms';
import {UserService} from '../../auth/user.service';
import {DirectusFilter} from '../../../shared/directus.service';
import {UserModel} from '../../auth/user.model';
import {MailService} from '../mail.service';

@Component({
  selector: 'app-mail-page',
  templateUrl: './mail-page.component.html',
  styleUrls: ['./mail-page.component.css']
})
export class MailPageComponent implements OnInit {
  mailForm: UntypedFormGroup;
  initTinyMCE = {
    height: '100%',
    base_url: '/tinymce',
    suffix: '.min',
    menubar: false,
    plugins: [
      'advlist autolink link lists charmap hr anchor pagebreak visualchars code nonbreaking emoticons template '
    ],
    toolbar: 'styleselect | bold italic underline | fontselect fontsizeselect | alignleft aligncenter alignright alignjustify | ' +
      'bullist numlist outdent indent | link | forecolor backcolor emoticons'
  };
  filteredOptions: Observable<UserModel[]>;
  constructor(private fb: UntypedFormBuilder,
              private mailService: MailService,
              private userService: UserService) {
    this.mailForm = this.fb.group({
      to: new UntypedFormControl('', Validators.required),
      object: new UntypedFormControl('', Validators.required),
      content: new UntypedFormControl('', Validators.required)
    });
  }

  ngOnInit() {
    this.filteredOptions = this.mailForm.get('to').valueChanges
      .pipe(
        startWith(''),
        debounceTime(500),
        switchMap(value => {
          if ((value || '').length < 3) {
            return of([]);
          }
          const filter: DirectusFilter[] = [
            {field: 'email', operator: 'like', value},
            {field: 'email', operator: 'logical', value: 'or'},
            {field: 'first_name', operator: 'like', value},
            {field: 'first_name', operator: 'logical', value: 'or'},
            {field: 'last_name', operator: 'like', value}
          ];
          return this.userService.getAll(false, {filter, sort: ['email'], limit: 10});
        })
      );
  }

  displayFn(user: UserModel): string {
    return user ? `${user.first_name} ${user.last_name} <${user.email}>` : '';
  }

  sendMail(event) {
    event.preventDefault();
    const {to, object, content} = this.mailForm.value;
    this.mailService.sendEmail(to, object, content, {}).subscribe(() => {
      this.mailForm.reset();
    });
  }
}
