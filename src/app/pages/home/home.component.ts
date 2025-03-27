import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-home',
  standalone: true,
  imports: [CommonModule, RouterModule],
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent {
  routesList = [
    //{ path: '/dashboard', name: 'Dashboard' },
    { path: '/staff-roles-summary', name: 'Staff Summary' },
    //{ path: '/events', name: 'Events' }
  ];
}