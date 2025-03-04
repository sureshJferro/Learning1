import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  private usernameKey=  'userName';

  setUsername(name: string) {
    localStorage.setItem(this.usernameKey, name);
  }

  getUsername(): string {
    return localStorage.getItem(this.usernameKey) || '';
  }

  removeUsername(){
    return localStorage.removeItem(this.usernameKey);
  }
}
