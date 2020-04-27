import { Component, OnInit } from '@angular/core';
import {CompteRenduService} from '../compte-rendu.service';
import {CompteRenduModel} from '../compte-rendu.model';
import {concatMap, tap} from 'rxjs/operators';
import {Observable} from 'rxjs';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'app-compte-rendu-page',
  templateUrl: './compte-rendu-page.component.html',
  styleUrls: ['./compte-rendu-page.component.css']
})
export class CompteRenduPageComponent implements OnInit {
  cr$: Observable<CompteRenduModel>;
  paramId: number;
  constructor(private compteRenduService: CompteRenduService,
              private route: ActivatedRoute) { }

  ngOnInit(): void {
    this.loadPage();
  }

  /**
   * load page from directus database
   */
  loadPage() {
    this.cr$ = this.route.paramMap.pipe(
      // get page name from url
      tap(params => {
        if (params.has('id')) {
          this.paramId = parseInt(params.get('id'), 10);
        }
      }),
      // load page content
      concatMap(() => this.compteRenduService.getById(this.paramId, true))
    );
  }

}
