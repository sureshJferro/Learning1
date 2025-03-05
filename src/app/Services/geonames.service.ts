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
    return this.http.get('https://jsonplaceholder.typicode.com/post').pipe(
      retry(3), // Retry the request 3 times
      catchError(this.handleError      )
    );
  }
  private handleError(error: any) {
    console.error('An error occurred:', error);
    return throwError(() => new Error('Failed to fetch posts. Try again later.'));
  }
}
