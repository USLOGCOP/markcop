import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import './vendor';
import { MarkcopSharedModule } from 'app/shared/shared.module';
import { MarkcopCoreModule } from 'app/core/core.module';
import { MarkcopAppRoutingModule } from './app-routing.module';
import { MarkcopHomeModule } from './home/home.module';
import { MarkcopEntityModule } from './entities/entity.module';
// jhipster-needle-angular-add-module-import JHipster will add new module here
import { MainComponent } from './layouts/main/main.component';
import { NavbarComponent } from './layouts/navbar/navbar.component';
import { FooterComponent } from './layouts/footer/footer.component';
import { PageRibbonComponent } from './layouts/profiles/page-ribbon.component';
import { ErrorComponent } from './layouts/error/error.component';
import { MapsComponent } from './maps/maps.component';
import { LeafComponent } from './leaf/leaf.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';

@NgModule({
  imports: [
    BrowserModule,
    MarkcopSharedModule,
    MarkcopCoreModule,
    MarkcopHomeModule,
    // jhipster-needle-angular-add-module JHipster will add new module here
    MarkcopEntityModule,
    MarkcopAppRoutingModule,
    LeafletModule,
  ],
  declarations: [MainComponent, NavbarComponent, ErrorComponent, PageRibbonComponent, FooterComponent, MapsComponent, LeafComponent],
  bootstrap: [MainComponent],
})
export class MarkcopAppModule {}
