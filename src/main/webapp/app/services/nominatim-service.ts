import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { NominatimResponse } from '../shared/model/maps/nominatim-response.model';
import { map } from 'rxjs/operators';
import { BASE_NOMINATIM_URL } from '../app.constants';

@Injectable()
export class NominatimService {
  constructor(private http: HttpClient) {}

  addressLookup(req?: any): Observable<NominatimResponse[]> {
    // See: https://nominatim.org/release-docs/develop/api/Search/
    // const boundedUrl = `https://${BASE_NOMINATIM_URL}/search?format=json&q=${req}&${DEFAULT_VIEW_BOX}&bounded=1`;

    const url = `https://${BASE_NOMINATIM_URL}/search?format=json&q=${req}`;

    return this.http
      .get<NominatimResponse[]>(url)
      .pipe(map((data: any[]) => data.map((item: any) => new NominatimResponse(item.lat, item.lon, item.display_name))));
  }
}
