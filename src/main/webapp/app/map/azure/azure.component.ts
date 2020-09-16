import { Component, OnInit } from '@angular/core';
import * as atlas from 'azure-maps-control';
import * as atlasService from 'azure-maps-rest';

@Component({
  selector: 'jhi-maps',
  templateUrl: './azure.component.html',
  styleUrls: ['./azure.component.scss'],
})
export class MapsComponent implements OnInit {
  // Azure Active Directory Authentication Client ID
  // or Shared Key Authentication KEY
  // get it from portal.azure.com
  key = 'dUH-yK0LjJQvor7ZoLO6abBWBOL5KId1wCJSDZ2-hss';
  map: any;
  searchText: any = '';
  datasource: any;
  popup: any;
  dataFeatures: any;
  resultsPanel: any;
  selectedLocation: any;
  centerMapOnResults: any;
  searchInputLength: any;

  constructor() {}

  ngOnInit(): void {
    // Initialize a map instance.
    this.map = new atlas.Map('mapContainer', {
      center: [-118.270293, 34.039737],
      zoom: 14,
      view: 'Auto',
      renderWorldCopies: false,
      showLogo: false,
      showFeedbackLink: false,
      showBuildingModels: true,

      // Add your Azure Maps key to the map SDK. Get an Azure Maps key at https://azure.com/maps. NOTE: The primary key should be used as the key.
      authOptions: {
        authType: atlas.AuthenticationType.subscriptionKey,
        subscriptionKey: this.key,
      },
    });

    // Wait until the map resources are ready.
    this.map.events.add('ready', () => {
      // Add the zoom control to the map.
      this.map.controls.add(new atlas.control.ZoomControl(), {
        position: 'top-right',
      });

      // Add the Style Control to the map
      this.map.controls.add(
        new atlas.control.StyleControl({
          mapStyles: ['road', 'grayscale_dark', 'night', 'road_shaded_relief', 'satellite', 'satellite_road_labels'],
        }),
        {
          position: 'top-right',
        }
      );

      // Create a data source and add it to the map.
      this.datasource = new atlas.source.DataSource();
      this.map.sources.add(this.datasource);

      // Add a layer for rendering the results.
      const searchLayer = new atlas.layer.SymbolLayer(this.datasource);

      this.map.layers.add(searchLayer);

      // Add a click event to the search layer and show a popup when a result is clicked.
      this.map.events.add('click', searchLayer, (e: any) => {
        // Make sure the event occurred on a shape feature.
        if (e.shapes && e.shapes.length > 0) {
          this.showPopup(e.shapes[0]);
        }
      });
    });
  }

  itemHovered(id: any): void {
    // Show a popup when hovering an item in the result list.
    const shape = this.datasource.getShapeById(id);
    this.showPopup(shape);
  }

  itemClicked(id: any): void {
    // Center the map over the clicked item from the result list.
    const shape = this.datasource.getShapeById(id);
    this.map.setCamera({
      center: shape.getCoordinates(),
      zoom: 17,
    });
  }

  // When the user starts typing in the search field.
  onKey(event: any): void {
    // The minimum number of characters needed in the search input before a search is performed.
    const minSearchInputLength = 3;

    this.searchText = event.target.value;

    this.centerMapOnResults = false;
    if (this.searchText.length >= minSearchInputLength) {
      if (event.keyCode === 13) {
        this.centerMapOnResults = true;
      }

      // console.log('SEARCHING FOR: ' + this.searchText);
      this.search();
    } else {
      // console.log('NOT SEARCHING: ' + this.searchText);
      // resultsPanel.innerHTML = '';
    }
    this.searchInputLength = this.searchText.length;
  }

  // Search for locations on the map
  search(): void {
    // console.log('Starting Search');
    // Remove any previous results from the map.
    this.datasource.clear();

    if (this.popup) {
      this.popup.close();
    }

    // Use SubscriptionKeyCredential with a subscription key
    const subscriptionKeyCredential = new atlasService.SubscriptionKeyCredential(atlas.getSubscriptionKey());

    // Use subscriptionKeyCredential to create a pipeline
    const pipeline = atlasService.MapsURL.newPipeline(subscriptionKeyCredential);

    // Construct the SearchURL object
    const searchURL = new atlasService.SearchURL(pipeline);

    // const query = (document.getElementById('search-input')).value;

    searchURL
      .searchPOI(atlasService.Aborter.timeout(10000), this.searchText, {
        maxFuzzyLevel: 4,
        view: 'Auto',
      })
      .then(results => {
        // Extract GeoJSON feature collection from the response and add it to the datasource
        const data = results.geojson.getFeatures();
        this.dataFeatures = data.features;
        this.datasource.add(data);

        if (this.centerMapOnResults) {
          this.map.setCamera({
            bounds: data.bbox,
          });
        }

        // console.log(data);
        // console.log('Features!: ' + this.dataFeatures);
      });
  }

  showPopup(shape: any): void {
    if (!this.popup) {
      // Create a popup which we can reuse for each result.
      this.popup = new atlas.Popup({
        pixelOffset: [0, -18],
        closeButton: false,
      });
    }

    const properties = shape.getProperties();
    // Create the HTML content of the POI to show in the popup.
    const html = ['<div class="poi-box">'];
    // Add a title section for the popup.
    html.push('<div class="poi-title-box"><b>');

    if (properties.poi && properties.poi.name) {
      html.push(properties.poi.name);
    } else {
      html.push(properties.address.freeformAddress);
    }
    html.push('</b></div>');
    // Create a container for the body of the content of the popup.
    html.push('<div class="poi-content-box">');
    html.push('<div class="info location">', properties.address.freeformAddress, '</div>');
    if (properties.poi) {
      if (properties.poi.phone) {
        html.push('<div class="info phone">', properties.phone, '</div>');
      }
      if (properties.poi.url) {
        html.push('<div><a class="info website" href="http://', properties.poi.url, '">http://', properties.poi.url, '</a></div>');
      }
    }
    html.push('</div></div>');

    // console.log('HTML FOR POPUP: '+html.join(''));

    this.popup.setOptions({
      position: shape.getCoordinates(),
      content: html.join(''),
    });
    this.popup.open(this.map);
  }
}
