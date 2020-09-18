import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapsComponent } from './azure/azure.component';
import { LeafComponent } from './leaflet/leaflet.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { RouterModule } from '@angular/router';
import { GeocodingComponent } from './geocoding/geocoding.component';
import { MapPointFormComponent } from './map-point-form/map-point-form.component';
import { ResultsListComponent } from './results-list/results-list.component';

@NgModule({
  declarations: [MapsComponent, LeafComponent, GeocodingComponent, MapPointFormComponent, ResultsListComponent],
  imports: [
    RouterModule.forChild([
      {
        path: 'azure',
        component: MapsComponent,
        data: {
          authorities: [],
          pageTitle: 'Azure Map',
        },
      },
      {
        path: 'leaflet',
        component: LeafComponent,
        data: {
          authorities: [],
          pageTitle: 'Leaflet Map',
        },
      },
    ]),
    CommonModule,
    LeafletModule,
  ],
})
export class MarkcopMapModule {}
