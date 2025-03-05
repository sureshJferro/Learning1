import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, retry, throwError } from 'rxjs';

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
  getPosts():Observable<any>{
    return this.http.get('https://jsonplaceholder.typicode.com/posts').pipe(
      retry(3), // Retry the request 3 times
      catchError((error) => {
        console.error('Failed after 3 retries');
        return throwError(() => new Error('Failed to fetch data!'));
      })
    );
  }
}
