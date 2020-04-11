import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FaqPageComponent } from './faq-page/faq-page.component';
import {FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatChipsModule} from '@angular/material/chips';
import {MatExpansionModule} from '@angular/material/expansion';
import {RouterModule, Routes} from '@angular/router';
import {MatInputModule} from '@angular/material/input';
import {MatButtonModule} from '@angular/material/button';
import {FormsModule} from '@angular/forms';
import { FaqSearchPipe } from './faq-search.pipe';
import { FaqFilterPipe } from './faq-filter.pipe';
import {SharedModule} from '../shared/shared.module';

const faqRoutes: Routes = [
  { path: 'faq', component: FaqPageComponent}
];

@NgModule({
  declarations: [FaqPageComponent, FaqSearchPipe, FaqFilterPipe],
    imports: [
        CommonModule,
        FontAwesomeModule,
        MatChipsModule,
        MatExpansionModule,
        RouterModule.forChild(faqRoutes),
        MatInputModule,
        MatButtonModule,
        FormsModule,
        SharedModule
    ],
  exports: [
    RouterModule
  ]
})
export class FaqModule { }
