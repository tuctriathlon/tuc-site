import {Component, OnInit} from '@angular/core';
import {FormBuilder, Validators} from '@angular/forms';
import {UserService} from '../user.service';
import {DirectusFileService} from '../../../shared/directusFiles/directus-file.service';
import {map, switchMap, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';

@Component({
  selector: 'app-user-info',
  templateUrl: './user-info.component.html',
  styleUrls: ['./user-info.component.css']
})
export class UserInfoComponent implements OnInit {
  imageUrl: string | ArrayBuffer;
  imageFile: File;
  userForm = this.fb.group({
    id: [-1, Validators.required],
    first_name: ['', Validators.required],
    last_name: ['', Validators.required],
    email: ['', Validators.required],
    password: '',
    company: '',
    avatar: [null]
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

  save(event) {
    event.preventDefault();
    const data2save = this.userForm.value;
    if (!data2save.password) {
      delete data2save.password;
    }
    if (! data2save.description) {
      delete data2save.description;
    }
    let fileSave: Observable<any>;
    if (this.imageFile) {
      const formData = new FormData();
      formData.append('data', this.imageFile, this.imageFile.name);
      fileSave = this.fileService.createFile(formData).pipe(map(file => data2save.avatar = file.id));
    } else {
      fileSave = of(1);
    }

    fileSave.pipe(
      switchMap(() => this.userService.updateItem(this.userForm.value.id, data2save))
    ).subscribe(user => {
      this.userForm.patchValue(user);
    });
  }

  preview(event) {
    const files = event.target.files;
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
    this.imageFile = files[0];
    reader.readAsDataURL(files[0]);
  }

}
