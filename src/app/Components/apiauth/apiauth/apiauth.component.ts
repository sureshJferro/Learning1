import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { CoreapiService } from '../../../Services/coreapi.service';
export interface User {
  userid: string;
  username: string;
  password: string;
  isgoogleauthenticated: boolean;
  usertoken: string;
  createdAt: string;
  updatedAt: string;
  orders: any[]; // Replace with actual order interface if needed
}

@Component({
  selector: 'app-apiauth',
  templateUrl: './apiauth.component.html',
  styleUrl: './apiauth.component.css'
})

export class ApiauthComponent {
token:string="";
accesstoken:string="";
users:User[]=[];
jwtcopied:boolean=false;
copied:boolean=false;
constructor(private tostr:ToastrService,private apiservice:CoreapiService){

}

GetJWT() {
  this.apiservice.getJWT().subscribe({
    next: (data) => {
      //console.log(data);
      this.tostr.success('JWT retrieved successfully');
      this.token=data.token;
    },
    error: (err) => {
      //console.error(err);
       this.tostr.error('Failed to retrieve JWT ' +err.message);
    
    }
  });
}
GetAccessToken() {
  this.apiservice.GetAccessToken(this.token).subscribe({
    next: (data) => {
      //console.log(data);
      this.tostr.success('Access token retrieved successfully ');
      this.accesstoken=data.accessToken;
    },
    error: (err) => {
      //console.error(err);
       this.tostr.error('Failed to retrieve access token ');
       this.accesstoken=err.message;
    }
  });
}
GetUser() {
  this.apiservice.Getusers(this.accesstoken).subscribe({
    next: (data: User[]) => {
      this.tostr.success('Access token retrieved successfully ');
      this.users=data;
      //console.log(this.users);
    },
    error: (err) => {
      //console.error(err);
       this.tostr.error('Failed to retrieve access token ');
       this.accesstoken=err.message;
    }
  });
}
copyToken() {
  navigator.clipboard.writeText(this.token);
  this.jwtcopied = true;
  setTimeout(() => this.jwtcopied = false, 2000);
}

copyAccessToken() {
  navigator.clipboard.writeText(this.accesstoken);
  this.copied = true;
  setTimeout(() => this.copied = false, 2000);
}

}
