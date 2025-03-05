import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GeonamesService } from '../../Services/geonames.service';

@Component({
  selector: 'app-aichild',
  templateUrl: './aichild.component.html',
  styleUrl: './aichild.component.css'
})
export class AIChildComponent {
  @Input() parentMessage: string = ''; // Receiving from parent
  childmsg : string = ''; // Local variable
  @Output() childMessage = new EventEmitter<string>(); // Sending to parent
  @Output() childPosts = new EventEmitter<any>(); // Sending to parent
constructor(private geoservices:GeonamesService){

}
  sendMessage() {
    this.childMessage.emit(this.childmsg);
  }
  GetPosts() {
    this.geoservices.getPosts().subscribe({
    //console.log(data);
    next: (data) => this.childPosts.emit(data),
    error: (err) => this.childPosts.emit(err.message),
    complete: () => console.log('Request completed')
    });
  }

}
