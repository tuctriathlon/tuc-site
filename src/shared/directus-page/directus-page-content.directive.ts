import {Directive, TemplateRef} from '@angular/core';

@Directive({
  selector: '[appDirectusPageContent]'
})
export class DirectusPageContentDirective {

  constructor(public tpl: TemplateRef<any>) { }

}
