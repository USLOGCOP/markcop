import { Component, EventEmitter, Input, Output } from '@angular/core';
import { NominatimResponse } from '../../shared/model/maps/nominatim-response.model';

@Component({
  selector: 'jhi-results-list',
  templateUrl: './results-list.component.html',
  styleUrls: ['./results-list.component.scss'],
})
export class ResultsListComponent {
  @Input()
  results!: NominatimResponse[];

  @Output()
  locationSelected = new EventEmitter();

  constructor() {}

  selectResult(result: NominatimResponse): void {
    this.locationSelected.emit(result);
  }
}
