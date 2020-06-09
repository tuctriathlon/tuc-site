import { Pipe, PipeTransform } from '@angular/core';
import {FaqModel} from './faq.model';
import unidecode from 'unidecode';

@Pipe({
  name: 'faqSearch'
})
export class FaqSearchPipe implements PipeTransform {

  transform(value: FaqModel[], searchText: string): FaqModel[] {
    const words = unidecode(searchText)
      .split(/\s|\W/)
      .filter(w => w.length > 2);
    return (value || []).filter(v => !words.length
      || words.some(w => unidecode(v.reponse).includes(w) || unidecode(v.question).includes(w)));
  }

}
