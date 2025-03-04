import { Injectable } from '@angular/core';
import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { auth } from '../firebase/firebase.config';
import { ToastrService } from 'ngx-toastr';
import { UserService } from './user.service';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
  
  constructor(
    private toastr: ToastrService,
    private userService: UserService,
    private router: Router) { }

  loginWithGoogle(){
    const provider = new GoogleAuthProvider(); 
    provider.addScope('https://www.googleapis.com/auth/contacts.readonly');
    auth.languageCode = 'it';
    signInWithPopup(auth, provider)
    .then((result) => {
      // This gives you a Google Access Token. You can use it to access the Google API.
      const credential = GoogleAuthProvider.credentialFromResult(result);
      //const token = credential.accessToken;
      // The signed-in user info.
      const user = result.user;
      
      console.log('User Info:', result.user);
      this.toastr.success('Login Successful! '+user.displayName);
  
      if(user!=null && user.displayName!=null){
        this.userService.setUsername(user.displayName); 
        localStorage.setItem('userToken',user.refreshToken)
      }  
      this.router.navigate(['/secure/dashboard']);
    }).catch((error) => {
      // Handle Errors here.
      const errorCode = error.code;
      const errorMessage = error.message;
      this.toastr.error(errorMessage);
      // The email of the user's account used.
      const email = error.customData.email;
      // The AuthCredential type that was used.
      const credential = GoogleAuthProvider.credentialFromError(error);
      // ...
    });
        
  }
  async login(data:any){
      return await signInWithEmailAndPassword(auth,data.email,data.password);
  }
  logout(){
    localStorage.removeItem("userToken");
  }
  isAuthenticated(){
    return !!localStorage.getItem("userToken");
  }
}
