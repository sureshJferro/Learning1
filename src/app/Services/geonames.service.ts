import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GeonamesService {

  private baseUrl = 'http://api.geonames.org/postalCodeSearchJSON';

  constructor(private http: HttpClient) { }

  getPostalCode(postalCode: string, country: string): Observable<any> {
    const username = 'suresh21'; 
    const url = `${this.baseUrl}?postalcode=${postalCode}&country=${country}&username=${username}`;
    return this.http.get(url);
  }
}
