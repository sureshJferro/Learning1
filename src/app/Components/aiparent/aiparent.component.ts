import { HttpClient } from '@angular/common/http';
import { Component } from '@angular/core';
import { from, filter, Observable,mergeMap } from 'rxjs';

@Component({
  selector: 'app-aiparent',
  templateUrl: './aiparent.component.html',
  styleUrls: ['./aiparent.component.css']
})
export class AIParentComponent {
  message: string = 'Hello from Parent!';
  childMsg: string = '';
  users: any[] = [];
  result: number = 0;
  filterid: number = 0;
  name: string = '';

  constructor(private http: HttpClient) {}

  receiveMessage(event: string) {
    this.childMsg = event;
    console.log('Message received from child:', event);
  }
  getUsersfromAPI() {
    this.http.get('https://jsonplaceholder.typicode.com/users')
      .subscribe((data: any) => {
        this.users = data;
      });
  }
  getUsers(): Observable<any[]> {
    return this.http.get<any[]>('https://jsonplaceholder.typicode.com/users');
  }

  startFilter() {
    this.users = [];
    this.getUsers().subscribe((data) => {
      from(data) // Convert array into observable stream
        .pipe(
          filter((user: any) => user.name.toLowerCase() === this.name.toLowerCase()) // Filter users by name
        )
        .subscribe({
          next: (filteredUser) => {
            console.log('Filtered User:', filteredUser);
            this.users.push(filteredUser);
          },
          complete: () => console.log('Filter Observable Completed')
        });
    });
  }

  startMergeMap() {
    this.users = [];
    const ids = new Observable<number>((observer) => {
      observer.next(this.filterid);
      observer.complete();
    });

    ids.pipe(
      filter((id) => id > 0), // Only filter valid IDs
      mergeMap((id) => this.http.get(`https://jsonplaceholder.typicode.com/users/${id}`))
    ).subscribe({
      next: (data) => {
        console.log('Data:', data);
        this.users.push(data);
      },
      complete: () => console.log('MergeMap Observable Completed')
    });
  }
}
