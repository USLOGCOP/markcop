import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { MapsComponent } from './azure/azure.component';
import { LeafComponent } from './leaflet/leaflet.component';
import { LeafletModule } from '@asymmetrik/ngx-leaflet';
import { RouterModule } from '@angular/router';

@NgModule({
  declarations: [MapsComponent, LeafComponent],
  imports: [
    RouterModule.forChild([
      {
        path: 'maps',
        component: MapsComponent,
        data: {
          authorities: [],
          pageTitle: 'Azure Map',
        },
      },
      {
        path: 'leaf',
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
