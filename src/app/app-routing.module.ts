import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { SignupComponent } from './Components/signup/signup.component';
import { LoginComponent } from './Components/login/login.component';
import { HomeComponent } from './Components/home/home.component';
import { DashboardComponent } from './Components/dashboard/dashboard.component';
import { PublicapiComponent } from './Components/publicapi/publicapi.component';
import { authGuard } from './Guard/auth.guard';
import { AIParentComponent } from './Components/aiparent/aiparent.component';
import { AIChildComponent } from './Components/aichild/aichild.component';


const routes: Routes = [
  { path: 'signup', component: SignupComponent },
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'secure', component: HomeComponent, canActivate: [authGuard],
    children:[
      {path: 'dashboard',component: DashboardComponent, canActivate: [authGuard]},
      {path: 'public',component: PublicapiComponent, canActivate: [authGuard]},
      {path: 'ai',component: AIParentComponent, canActivate: [authGuard]},
      {path: 'aichild',component: AIChildComponent, canActivate: [authGuard]},
    ]
   },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
