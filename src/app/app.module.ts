import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import {FaIconLibrary, FontAwesomeModule} from '@fortawesome/angular-fontawesome';
import {MatButtonModule} from '@angular/material/button';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {HomeComponent} from './pages/home/home.component';
import {AppRoutingModule} from './app-routing.module';
import {EventComponent} from './components/event/event.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {EventCardComponent} from './components/event-card/event-card.component';
import {MatCardModule} from '@angular/material/card';
import {EventPageComponent} from './pages/event-page/event-page.component';
import {TestPageComponent} from './pages/test-page/test-page.component';
import {FormsModule, ReactiveFormsModule} from '@angular/forms';
import {HttpClientModule} from '@angular/common/http';
import {AuthModule} from '../auth/auth.module';
import {LoginComponent} from '../auth/login/login.component';
import {MatDialogModule} from '@angular/material/dialog';
import {fas} from '@fortawesome/free-solid-svg-icons';
import {ForgottenPasswordComponent} from '../auth/forgotten-password/forgotten-password.component';
import {MatMenuModule} from '@angular/material/menu';
import {TrainingModule} from '../training/training.module';
import {SharedModule} from '../shared/shared.module';
import { FullCalendarModule } from '@fullcalendar/angular';
import {FaqModule} from '../faq/faq.module';
import {CompteRenduModule} from '../compte-rendu/compte-rendu.module';
import {HashLocationStrategy, LocationStrategy} from '@angular/common';
import {TucIcon} from '../shared/icons/tuc.icon';
import {TdtIcon} from '../shared/icons/tdt.icon';
import {TucOmnisportIcon} from '../shared/icons/tucOmnisport.icon';
import {AbsoluIcon} from '../shared/icons/absolu.icon';
import { InscriptionPageComponent } from './pages/inscription.page/inscription.page.component';
import {MatRadioModule} from '@angular/material/radio';
import {MatFormFieldModule} from '@angular/material/form-field';
import {MatSelectModule} from '@angular/material/select';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    EventPageComponent,
    TestPageComponent,
    EventComponent,
    EventCardComponent,
    InscriptionPageComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    HttpClientModule,
    FontAwesomeModule,
    FullCalendarModule,
    MatSliderModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    MatButtonModule,
    MatPaginatorModule,
    MatDialogModule,
    MatMenuModule,
    MatCardModule,
    // tuc modules
    SharedModule,
    AuthModule,
    TrainingModule,
    FaqModule,
    CompteRenduModule,
    // appRouting module doit être en dernier
    AppRoutingModule,
    MatRadioModule,
    MatFormFieldModule,
    ReactiveFormsModule,
    MatSelectModule,
  ],
  entryComponents: [
    LoginComponent,
    ForgottenPasswordComponent
  ],
  providers: [{provide: LocationStrategy, useClass: HashLocationStrategy}],
  bootstrap: [AppComponent]
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIconPacks(fas);
    // @ts-ignore
    library.addIcons(new TucIcon());
    // @ts-ignore
    library.addIcons(new TdtIcon());
    // @ts-ignore
    library.addIcons(new TucOmnisportIcon());
    // @ts-ignore
    library.addIcons(new AbsoluIcon());
  }
}
