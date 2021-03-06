import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { MarkcopSharedModule } from 'app/shared/shared.module';
import { MarkcopCoreModule } from 'app/core/core.module';
import { MarkcopAppRoutingModule } from './app-routing.module';
import { MarkcopHomeModule } from './home/home.module';
import { MarkcopEntityModule } from './entities/entity.module';
import { MarkcopMapModule } from './maps/map.module';

// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { NominatimService } from './services/nominatim-service';

@NgModule({
  imports: [
    BrowserModule,
    MarkcopSharedModule,
    MarkcopCoreModule,
    MarkcopHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    MarkcopEntityModule,
    // Module used to organize map-page functionality. -MYB 2020
    MarkcopMapModule,
    MarkcopAppRoutingModule,
    LeafletModule,
  ],
  providers: [NominatimService],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent],
  bootstrap: [MainComponent],
})
export class MarkcopAppModule {}
