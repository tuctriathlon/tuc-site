import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {DirectusFileService} from '../../../shared/directusFiles/directus-file.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  imageUrl: string | ArrayBuffer;
  userForm = this.fb.group({
    id: [-1, Validators.required],
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', Validators.required],
    password: '',
    company: '',
    avatar: [null, Validators.required]
  });
  constructor(private fb: FormBuilder,
              private userService: UserService,
              private fileService: DirectusFileService) { }

  ngOnInit(): void {
    this.userService.getMe().pipe(
      tap(user => console.log(user.avatar))
    ).subscribe(user => {
      this.userForm.patchValue(user);
      this.loadAvatar();
    });
  }

  loadAvatar() {
    this.fileService.getById(this.userForm.value.avatar).subscribe(file => {
      this.imageUrl = file.location;
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
    /*const fileSave = data2save.avatar < 0 ?
      this.fileService.createFile(btoa(String.fromCharCode(
      ...new Uint8Array(this.imageUrl))),
       ['avatar', `${data2save.first_name} ${data2save.last_name}`])
      .pipe(map(file => data2save.avatar = file.id)) : of(1);

    fileSave.pipe(
      switchMap(() => this.userService.updateItem(this.userForm.value.id, data2save))
    ).subscribe(user => {
      this.userForm.patchValue(user);
    });*/
  }

  preview(files) {
    const reader = new FileReader();
    this.userForm.patchValue({
      avatar: -1
    });

    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        this.userForm.patchValue({
          height: img.height,
          width: img.width
        });
      };
      if (typeof reader.result === 'string') {
        img.src = reader.result;
      }
      this.imageUrl = reader.result;
    };
    reader.readAsDataURL(files[0]);
  }

}
