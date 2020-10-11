import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {AlertService} from '../services/alert.service';
import {Location} from '@angular/common';
import {Router} from '@angular/router';
import {environment} from '../../environments/environment';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
  constructor(private injector: Injector,
              private router: Router) { }

  /**
   * add a message containing the error detail to message service
   */
  async handleError(error: Error| HttpErrorResponse) {
    if (environment.production) {
      await this.router.navigateByUrl('erreur');
    } else {
      const alertService = this.injector.get(AlertService);
      if (error instanceof HttpErrorResponse) {
        alertService.error(error.message);
      } else {
        alertService.error(error.toString());
      }
    }
    console.error(error);
  }
}
