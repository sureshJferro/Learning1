import { Component } from '@angular/core';

@Component({
  selector: 'app-aiparent',
  templateUrl: './aiparent.component.html',
  styleUrl: './aiparent.component.css'
})
export class AIParentComponent {
  message: string = 'Hello from Parent!';
childMsg: string = '';
  receiveMessage(event: string) {
    this.childMsg=event;
    console.log('Message received from child:', event);
  }
}
