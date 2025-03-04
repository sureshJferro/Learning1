import { Component, EventEmitter, Input, Output } from '@angular/core';

@Component({
  selector: 'app-aichild',
  templateUrl: './aichild.component.html',
  styleUrl: './aichild.component.css'
})
export class AIChildComponent {
  @Input() parentMessage: string = ''; // Receiving from parent
  childmsg : string = ''; // Local variable
  @Output() childMessage = new EventEmitter<string>(); // Sending to parent

  sendMessage() {
    this.childMessage.emit(this.childmsg);
  }
}
