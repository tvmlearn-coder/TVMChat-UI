import { Component } from '@angular/core';

@Component({
  selector: 'app-hamburger-menu',
  templateUrl: './hamburger-menu.component.html',
  styleUrls: ['./hamburger-menu.component.scss']
})
export class HamburgerMenuComponent {

  isMenuOpen = false;

  toggleMenu() {
    this.isMenuOpen = !this.isMenuOpen;
  }

  menuItems = [
    { label: 'Chats', icon: 'chat', route: '/chats' },
    { label: 'Status', icon: 'donut_large', route: '/status' },
    { label: 'Settings', icon: 'settings', route: '/settings' },
  
  ];
}
