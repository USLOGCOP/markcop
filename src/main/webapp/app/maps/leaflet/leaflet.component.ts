import { Component, OnInit } from '@angular/core';
import { DEFAULT_LATITUDE, DEFAULT_LONGITUDE } from 'app/app.constants';
import { latLng, Map, MapOptions, tileLayer, icon, Icon, marker } from 'leaflet';
import { MapPoint } from '../../shared/model/maps/map-point.model';
import { NominatimResponse } from '../../shared/model/maps/nominatim-response.model';

@Component({
  selector: 'jhi-leaf',
  templateUrl: './leaflet.component.html',
  styleUrls: ['./leaflet.component.scss'],
})
export class LeafComponent implements OnInit {
  // Reference to the main map component
  private map: any;

  // Object used to configure the Leaflet map
  public leafletMapOptions: any;

  // Adding for geo search
  results!: NominatimResponse[];
  mapPoint!: MapPoint;
  lastLayer: any;

  // ************************************************************************** */
  // Define our base layers so we can reference them in multiple places.
  // This is where we can add additional map layers.
  // Adding them to the layersControl object below will alow the user to select between the available layers.
  // ************************************************************************** */
  streetMaps = tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  });
  wMaps = tileLayer('http://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png', {
    detectRetina: true,
    attribution: '&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors',
  });

  // Defines the UI control where users can switch between map layers.
  layersControl = {
    baseLayers: {
      'Street Maps': this.streetMaps,
      'Wikimedia Maps': this.wMaps,
    },
    overlays: {},
    // TODO: This position string doesn't seem to be working.
    position: 'topLeft',
  };

  // Define the initial default map options we will assign to the map config object after it's loaded.
  defaultMapOptions: MapOptions = {
    layers: [this.streetMaps],
    zoom: 3,
    center: latLng([21.315603, -157.858093]), // LatLong for the state of Hawaii. Maybe set the default view to the INDO-PACIFIC region?
  };

  constructor() {}

  ngOnInit(): void {
    // TODO: Not sure if we have to initialize the map point or not.
    this.initializeDefaultMapPoint();

    // Wait until the component is loaded to configure the map settings object.
    this.initializeMapOptions();
  }

  onMapReady(map: Map): void {
    this.map = map;
  }

  private initializeMapOptions(): void {
    this.leafletMapOptions = {
      layers: this.defaultMapOptions.layers,
      zoom: this.defaultMapOptions.zoom,
      center: this.defaultMapOptions.center,
    };
  }

  // Map Search
  getAddress(result: NominatimResponse): void {
    this.updateMapPoint(result.latitude, result.longitude, result.displayName);
    this.createMarker();
  }

  refreshSearchList(results: NominatimResponse[]): void {
    this.results = results;
  }

  private initializeDefaultMapPoint(): void {
    this.mapPoint = {
      name: '',
      latitude: DEFAULT_LATITUDE,
      longitude: DEFAULT_LONGITUDE,
    };
  }

  private updateMapPoint(latitude: number, longitude: number, name?: string): void {
    this.mapPoint = {
      latitude,
      longitude,
      name: name ? name : this.mapPoint.name,
    };
  }

  private createMarker(): void {
    this.clearMap();
    const mapIcon = this.getDefaultIcon();
    const coordinates = latLng([this.mapPoint.latitude, this.mapPoint.longitude]);
    this.lastLayer = marker(coordinates).setIcon(mapIcon).addTo(this.map);
    this.map.setView(coordinates, this.map.getZoom());
  }

  private getDefaultIcon(): Icon {
    return icon({
      iconSize: [25, 41],
      iconAnchor: [13, 41],
      iconUrl: 'assets/marker-icon.png',
    });
  }

  private clearMap(): void {
    if (this.map.hasLayer(this.lastLayer)) this.map.removeLayer(this.lastLayer);
  }
}
