import {ErrorHandler, Injectable, Injector} from '@angular/core';
import {HttpErrorResponse} from '@angular/common/http';
import {AlertService} from '../services/alert.service';

@Injectable()
export class CustomErrorHandler implements ErrorHandler {
  constructor(private injector: Injector) { }

  /**
   * add a message containing the error detail to message service
   */
  handleError(error: Error| HttpErrorResponse): void {
    const alertService = this.injector.get(AlertService);
    if (error instanceof HttpErrorResponse) {
      alertService.error(error.message);
    } else {
      alertService.error(error.message);
    }
    console.error(error);
  }
}
