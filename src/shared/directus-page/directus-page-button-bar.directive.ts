import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[appDirectusPageButtonBar]'
})
export class DirectusPageButtonBarDirective {

  constructor(public tpl: TemplateRef<any>) { }

}
