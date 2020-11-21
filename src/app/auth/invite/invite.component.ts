import {Component, OnInit} from '@angular/core';
import {ActivatedRoute} from '@angular/router';
import {PageModel} from '../../../shared/directus-page/page.model';
import {UserModel} from '../user.model';
import {switchMap} from 'rxjs/operators';
import {UserService} from '../user.service';
import {Observable, of} from 'rxjs';
import {AuthService} from '../auth.service';

@Component({
  selector: 'app-invite',
  templateUrl: './invite.component.html',
  styleUrls: ['./invite.component.css']
})
export class InviteComponent implements OnInit {
  user$: Observable<UserModel>;
  page: PageModel;
  constructor(private route: ActivatedRoute,
              private userService: UserService,
              private authService: AuthService) {
  }

  ngOnInit(): void {
    this.user$ = this.route.paramMap.pipe(
      switchMap(params => this.userService.accepteInvitation(params.get('token'))),
      switchMap(user => {
        return this.authService.requestPwd(user.email).pipe(switchMap(() => of(user)));
      })
    );
  }
}
