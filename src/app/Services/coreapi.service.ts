import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class CoreapiService {
  private apiURL=  'https://localhost:7170/';
  constructor(private http: HttpClient) { }

  getJWT(): Observable<any> {
    return this.http.get(this.apiURL + 'user/GetJWT')
  }
  GetAccessToken(jwt:string): Observable<any> {
    const headers = new HttpHeaders({
      'Authentication': jwt
    });
    return this.http.get(this.apiURL + 'user/GetAccessToken',{headers})
  }
  Getusers(accessToken:string): Observable<any> {
    const headers = new HttpHeaders({
      'Authorization': accessToken
    });
    return this.http.get(this.apiURL + 'user/Getusers',{headers})
  }
}
