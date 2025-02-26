import { Component } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder} from '@angular/forms';
import {GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import {auth} from "../../firebase/firebase.config"
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  hide = true;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,private toastr:ToastrService, private router: Router) {
    this.loginForm = this.fb.group({
      email: ['', [Validators.required, Validators.email]],
      password: ['', Validators.required]
    });
  }
async login(){
  if (this.loginForm.invalid) {
    this.loginForm.markAllAsTouched(); // Show errors if form is invalid
    return;
  }
   debugger
   try {
var data = this.loginForm.value;
    const userCredential = await signInWithEmailAndPassword(auth,data.email,data.password);
    this.toastr.success(`Welcome back, ${userCredential.user.email}!`, 'Login Successful');
    } catch (error: any) {
      if (error.code === 'auth/user-not-found') {
        this.toastr.error('User not found. Please sign up first.', 'Login Error');
      } else if (error.code === 'auth/wrong-password') {
        this.toastr.error('Incorrect password. Please try again.', 'Login Error');
      } else if (error.code === 'auth/invalid-email') {
        this.toastr.warning('Invalid email format. Please enter a valid email.', 'Invalid Input');
      } else if (error.code === 'auth/missing-password') {
        this.toastr.warning('Password is required.', 'Invalid Input');
      } else if (error.code === 'auth/network-request-failed') {
        this.toastr.error('Network error. Please check your connection.', 'Network Issue');
      } else if (error.code === 'auth/invalid-credential') {
        this.toastr.error('Invalid email or password. Please check your credentials.', 'Login Error');
      } else {
        this.toastr.error('Sign-in error: ' + error.message, 'Login Failed');
      }
}
  // console.log('Logging in with:', this.loginForm.value);
}
async loginInWithGoogle() {
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
    this.toastr.success('login Successful!');
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
}