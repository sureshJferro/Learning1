import { Component } from '@angular/core';
import {FormControl, Validators, FormsModule, ReactiveFormsModule, FormGroup, FormBuilder} from '@angular/forms';
import {GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from "firebase/auth";
import {auth} from "../../firebase/firebase.config"
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';
import { UserService } from '../../Services/user.service';
import { AuthService } from '../../Services/auth.service';


@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css',
})
export class LoginComponent {
  hide = true;
  loginForm: FormGroup;

  constructor(private fb: FormBuilder,private toastr:ToastrService, 
     private router: Router
    ,private userService:UserService
    ,private authservice:AuthService) {
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
var data = this.loginForm.value;
   
   try {
    const userCredential = await this.authservice.login(data);
    this.toastr.success(`Welcome back, ${userCredential.user.displayName}!`, ' Login Successful');
    if(userCredential.user!=null && userCredential.user.displayName!=null){
      this.userService.setUsername(userCredential.user.displayName); 
    }  
    localStorage.setItem('userToken',userCredential.user.refreshToken)
    this.router.navigate(['/secure/dashboard']);
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
 this.authservice.loginWithGoogle();   
  }
}