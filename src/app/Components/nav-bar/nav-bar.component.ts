import { Component, EventEmitter, Input, Output } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { Router } from '@angular/router';
import { ToastrService } from 'ngx-toastr';
import { UserService } from '../../Services/user.service';
import { AuthService } from '../../Services/auth.service';
interface MenuItem {
  icon: string;
  label: string;
  children?: MenuItem[];
  isOpen?: boolean;
  path?:string;
}
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})

export class NavBarComponent {
  userEmail:string="";
  @Input() isSidebarCollapsed = false;
  @Output() sidebarToggle = new EventEmitter<void>();
 constructor(private tostr:ToastrService,private afAuth: AngularFireAuth,private router:Router,private userservice:UserService,private authservice:AuthService){
 }
 ngOnInit(): void {
  this.userEmail=this.userservice.getUsername();
 }
  menuItems: MenuItem[] = [
    {
      icon: 'fa-solid fa-house',
      label: 'Dashboard',
      isOpen: false,
      path:"/secure/dashboard"
    },
    
    {
      icon: 'fa-solid fa-right-from-bracket',
      label: 'Logout',
      path:""
    }
  ];

  toggleSidebar() {
    this.sidebarToggle.emit();
  }

  toggleMenuItem(item: MenuItem) {
    // Only toggle if sidebar is not collapsed and item has children
    if (!this.isSidebarCollapsed && item.children) {
      item.isOpen = !item.isOpen;
    }
  }
  async logout() {
    await this.afAuth.signOut();
    this.router.navigate(['']);
    this.tostr.success('Logged out successfully!');
  }
  handleNavigation(item: any) {
    if (item.label === 'Logout') {
      this.userservice.removeUsername();
      this.authservice.logout(); // Call logoff method for logout
      this.logout();
    } else {
      this.router.navigate([item.path]); // Navigate to the specified route
    }
  }
}