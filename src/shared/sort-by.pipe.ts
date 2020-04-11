import { Pipe, PipeTransform } from '@angular/core';
import {sortBy} from 'lodash';

@Pipe({
  name: 'sortBy'
})
export class SortByPipe implements PipeTransform {

  transform(value: any[], keys: string[]): any[] {
    return sortBy(value || [], keys);
  }

}
