import { Component, EventEmitter, Output } from '@angular/core';
import { NominatimService } from '../../services/nominatim-service';
import { NominatimResponse } from '../../shared/model/maps/nominatim-response.model';

@Component({
  selector: 'jhi-geocoding',
  templateUrl: './geocoding.component.html',
  styleUrls: ['./geocoding.component.scss'],
})
export class GeocodingComponent {
  @Output() onSearch = new EventEmitter();
  @Output() locationSelect = new EventEmitter();
  searchResults!: NominatimResponse[];

  constructor(private nominatimService: NominatimService) {}

  // TODO: Figure out if I'm handling this input field correctly. -MYB 09/18/2020
  addressLookup(target: any): void {
    if (target == null) {
      return;
    }

    const address: string = target.value;

    if (address.length > 3) {
      this.nominatimService.addressLookup(address).subscribe(results => {
        this.searchResults = results;
      });
    } else {
      this.searchResults = [];
    }
    this.onSearch.emit(this.searchResults);
  }
}
