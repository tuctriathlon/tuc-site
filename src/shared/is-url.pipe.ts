import { Pipe, PipeTransform } from '@angular/core';
import {TextUtils} from './text.utils';

@Pipe({
  name: 'isUrl'
})
export class IsUrlPipe implements PipeTransform {

  transform(value: string): boolean {
    return TextUtils.isUrl(value);
  }

}
