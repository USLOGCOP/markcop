import { Component, OnInit } from '@angular/core';
import { latLng, Map, MapOptions, tileLayer, Marker, icon } from 'leaflet';

@Component({
  selector: 'jhi-leaf',
  templateUrl: './leaflet.component.html',
  styleUrls: ['./leaflet.component.scss'],
})
export class LeafComponent implements OnInit {
  // Reference to the main map component
  private map: any;

  // Define our base layers so we can reference them multiple times
  streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  });
  wMaps = tileLayer('http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  });

  // Marker for the top of Mt. Ranier
  summit = new Marker([46.8523, -121.7603], {
    icon: icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'assets/marker-icon.png',
      shadowUrl: 'assets/marker-shadow.png',
    }),
  });

  // Marker for the parking lot at the base of Mt. Ranier trails
  paradise = new Marker([46.78465227596462, -121.74141269177198], {
    icon: icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'assets/marker-icon.png',
      iconRetinaUrl: 'assets/marker-icon-2x.png',
      shadowUrl: 'assets/marker-shadow.png',
    }),
  });

  // Layers control object with our two base layers and the three overlay layers
  layersControl = {
    baseLayers: {
      'Street Maps': this.streetMaps,
      'Wikimedia Maps': this.wMaps,
    },
    overlays: {
      'Mt. Rainier Summit': this.summit,
      'Mt. Rainier Paradise Start': this.paradise,
    },
    position: 'topLeft',
  };

  // Define initial default map options
  defaultMapOptions: any = {
    layers: [this.streetMaps, this.summit, this.paradise],
    zoom: 7,
    center: latLng([46.879966, -121.726909]),
  };

  // Apply initial default map options
  leafletOptions: MapOptions = {
    layers: this.defaultMapOptions.layers,
    zoom: this.defaultMapOptions.zoom,
    center: this.defaultMapOptions.center,
  };

  constructor() {}

  ngOnInit(): void {
    // this.initializeMapOptions();
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
    const newMarker = new Marker([51.51, 0]).setIcon(
      icon({
        iconSize: [25, 41],
        iconAnchor: [13, 41],
        iconUrl: 'assets/marker-icon.png',
      })
    );
    newMarker.addTo(this.map);
  }
}
