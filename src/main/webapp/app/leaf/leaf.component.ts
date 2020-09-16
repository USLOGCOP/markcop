import { Component, OnInit } from '@angular/core';
import { latLng, Map, MapOptions, tileLayer, Marker, icon } from 'leaflet';

@Component({
  selector: 'jhi-leaf',
  templateUrl: './leaf.component.html',
  styleUrls: ['./leaf.component.scss'],
})
export class LeafComponent implements OnInit {
  private map: any;

  optionsSpec: any = {
    layers: [{ url: 'http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', attribution: 'Open Streets Map' }],
    zoom: 11,
    center: [43.296174, 5.369953],
  };

  zoom = this.optionsSpec.zoom;
  center = latLng(this.optionsSpec.center);

  leafletOptions: MapOptions = {
    layers: [tileLayer(this.optionsSpec.layers[0].url, { attribution: this.optionsSpec.layers[0].attribution })],
    zoom: this.optionsSpec.zoom,
    center: latLng(this.optionsSpec.center),
  };

  constructor() {}

  ngOnInit(): void {
    this.initializeMapOptions();
  }

  onMapReady(map: Map): void {
    this.map = map;
    this.addSampleMarker();
  }

  private initializeMapOptions(): void {
    this.leafletOptions = {
      center: latLng(51.505, 0),
      zoom: 12,
      layers: [
        tileLayer('http://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
          maxZoom: 18,
          attribution: 'Map data © OpenStreetMap contributors',
        }),
      ],
    };
  }

  private addSampleMarker(): void {
    const marker = new Marker([51.51, 0]).setIcon(
      icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/marker-icon.png',
      })
    );
    marker.addTo(this.map);
  }
}
