import { Component, EventEmitter, Input, Output } from '@angular/core';
interface MenuItem {
  icon: string;
  label: string;
  children?: MenuItem[];
  isOpen?: boolean;
}
@Component({
  selector: 'app-nav-bar',
  templateUrl: './nav-bar.component.html',
  styleUrl: './nav-bar.component.css'
})
export class NavBarComponent {
  @Input() isSidebarCollapsed = false;
  @Output() sidebarToggle = new EventEmitter<void>();

  menuItems: MenuItem[] = [
    {
      icon: 'fa-solid fa-house',
      label: 'Dashboard',
      isOpen: false,
    },
    {
      icon: 'fas fa-cog',
      label: 'Settings',
      isOpen: false,
    },
    {
      icon: 'fas fa-envelope',
      label: 'Messages'
    }
    ,
    {
      icon: 'fa-solid fa-right-from-bracket',
      label: 'Logout'
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
}