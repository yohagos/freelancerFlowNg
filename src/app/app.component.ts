import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HeaderComponent } from "./shared/header/header.component";
import { ThemeService } from './core/theme/theme.service';

@Component({
    selector: 'app-root',
    standalone: true,
    templateUrl: './app.component.html',
    styleUrl: './app.component.scss',
    imports: [RouterOutlet, HeaderComponent]
})
export class AppComponent {
  title = 'freelancer-flow-ng';
  currentTheme: any
  
  constructor(
    private themeService: ThemeService,
  ) {
    this.themeService.loadTheme()
  }
}
