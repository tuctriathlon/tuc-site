import { Pipe, PipeTransform } from '@angular/core';
import {FaqModel} from './faqModel';

@Pipe({
  name: 'faqFilter'
})
export class FaqFilterPipe implements PipeTransform {

  transform(value: FaqModel[], poleId: number|null): FaqModel[] {
    if (poleId) {
      return (value || []).filter(v => v.tag === poleId);
    } else {
      return value;
    }
  }

}
