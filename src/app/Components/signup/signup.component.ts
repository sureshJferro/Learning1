import { Component } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AbstractControl, FormBuilder, FormGroup, Validators } from '@angular/forms';
import {signInWithPopup, GoogleAuthProvider } from "firebase/auth";
import { auth } from '../../firebase/firebase.config';
import { ToastrService } from 'ngx-toastr';
import { Router } from '@angular/router';


@Component({
  selector: 'app-signup',
  templateUrl: './signup.component.html',
  styleUrl: './signup.component.css'
})
export class SignupComponent {
  signupForm: FormGroup;
  hide = true;
  submitted = false;
  isSignupAvailable=false;
  constructor(private fb: FormBuilder,private afAuth: AngularFireAuth,private tostr:ToastrService,private router:Router) {
    this.signupForm = this.fb.group(
      {
        username: ['', Validators.required],
        email: ['', [Validators.required, Validators.email]],
        password: ['', [Validators.required, Validators.minLength(8)]],
        confirmPassword: ['', Validators.required]
      },
      { validators: this.passwordMatchValidator }
    );
  }

  get f() {
    return this.signupForm.controls;
  }

  passwordMatchValidator(control: AbstractControl) {
    const password = control.get('password')?.value;
    const confirmPassword = control.get('confirmPassword')?.value;

    return password === confirmPassword ? null : { passwordMismatch: true };
  }

  onSubmit() {
    this.submitted = true;
// Mark all form fields as touched
Object.values(this.signupForm.controls).forEach(control => {
  control.markAsTouched();
});
    if (this.signupForm.invalid) {
      return;
    }
else{
  //this.createuser(this.signupForm.value);
  console.log('Signup Successful', this.signupForm.value);
    this.tostr.success('Signup Successful!');
   
}
    
  }
  createuser(form:any){
   
}
  async signUpWithGoogle() {
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
    // console.log('User Info:', result.user);
    this.tostr.success('Signup Successful!');
    this.router.navigate(['/secure/dashboard']);
  }).catch((error) => {
    // Handle Errors here.
    const errorCode = error.code;
    const errorMessage = error.message;
    this.tostr.error(errorMessage);
    // The email of the user's account used.
    const email = error.customData.email;
    // The AuthCredential type that was used.
    const credential = GoogleAuthProvider.credentialFromError(error);
    // ...
  });
      
    
  }

  async logout() {
    await this.afAuth.signOut();
    alert('Logged out!');
  }
}