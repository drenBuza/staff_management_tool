import { Component } from '@angular/core';
import { RouterOutlet, Router } from '@angular/router';
import { HeaderComponent } from './components/header/header.component';
import { FooterComponent } from './components/footer/footer.component';
import { Location } from '@angular/common';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, FooterComponent],
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'staff_management_tool';

  constructor(private location: Location, private router: Router) {}

  goBack(): void {
    this.location.back();
  }

  shouldShowBackButton(): boolean {
    const hiddenRoutes = ['/', '/dashboard'];
    return !hiddenRoutes.includes(this.router.url);
  }
}