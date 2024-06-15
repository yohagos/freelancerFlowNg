import { Component } from '@angular/core';
import { MatToolbarModule } from "@angular/material/toolbar";
import { MatIconModule } from "@angular/material/icon";
import { MatButtonModule } from "@angular/material/button";
import { ThemeService } from '../../core/theme/theme.service';
import { NavigationEnd, Router } from '@angular/router';
import { CommonModule } from "@angular/common";
import { KeycloakService } from '../../core/keycloak/keycloak.service';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [
    MatToolbarModule,
    MatButtonModule,
    MatIconModule,
    CommonModule,
  ],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss'
})
export class HeaderComponent {
  showBackArrow = false
  checkLogPage = false

  themes = [
    {
      name: 'dark',
      icon: 'brightness_3'
    },
    {
      name: 'light',
      icon: 'wb_sunny'
    }
  ]

  constructor(
    private themeService: ThemeService,
    private router: Router,
    private keycloakService: KeycloakService,
  ) {
    this.router.events.subscribe(
      (event) => {
        if (event instanceof NavigationEnd) {
          if (event.url.includes('logs')) {
            this.checkLogPage = true
          }
          if (event.url !== '/login') {
            this.showBackArrow = true
            return
          }
          this.showBackArrow = false;
          return
        }
      }
    )
  }

  setTheme() {
    let currentTheme = this.themeService.currentActive()
    this.themeService.update(currentTheme === 'dark' ? 'light' : 'dark')
  }

  backToLogin() {
    if (this.checkLogPage) {
      this.checkLogPage = false
      this.router.navigate(['/project/overview'])
    } else {
      this.router.navigate(['/login'])
    }
  }

  logout() {
    this.keycloakService.logout()
  }

}
