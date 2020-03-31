import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSliderModule} from '@angular/material/slider';
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatSidenavModule} from '@angular/material/sidenav';
import {MatListModule} from '@angular/material/list';
import {MatIconModule} from '@angular/material/icon';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {MatButtonModule} from '@angular/material/button';
import {PageNotFoundComponent} from './pages/page-not-found/page-not-found.component';
import {HomeComponent} from './pages/home/home.component';
import {AppRoutingModule} from './app-rooting.module';
import {EventComponent} from './components/event/event.component';
import {MatPaginatorModule} from '@angular/material/paginator';
import {Home2Component} from './pages/home2/home2.component';
import {EventCardComponent} from './components/event-card/event-card.component';
import {MatCardModule} from '@angular/material/card';
import {EventPageComponent} from './pages/event-page/event-page.component';
import {A11yModule} from '@angular/cdk/a11y';

@NgModule({
  declarations: [
    AppComponent,
    PageNotFoundComponent,
    HomeComponent,
    Home2Component,
    EventPageComponent,
    EventComponent,
    EventCardComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    MatSliderModule,
    MatToolbarModule,
    MatSidenavModule,
    MatListModule,
    MatIconModule,
    FontAwesomeModule,
    MatButtonModule,
    AppRoutingModule,
    MatPaginatorModule,
    MatCardModule,
    A11yModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule {}

