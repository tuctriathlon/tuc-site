import { Component, OnInit } from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {UserModel} from '../user.model';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  userForm = this.fb.group({
    id: [-1, Validators.required],
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', Validators.required],
    password: '',
    company: ''
  });
  constructor(private fb: FormBuilder,
              private userService: UserService) { }

  ngOnInit(): void {
    this.userService.getMe().subscribe(user => {
      this.userForm.patchValue(user);
    });
  }

  save() {
    const data2save = this.userForm.value;
    if (!data2save.password) {
      delete data2save.password;
    }
    if (! data2save.description) {
      delete data2save.description;
    }
    this.userService.updateItem(this.userForm.value.id, data2save).subscribe(user => {
      this.userForm.patchValue(user);
    });
  }

}
