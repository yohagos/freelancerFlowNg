import { Component, OnInit } from '@angular/core';
import { CommonModule } from "@angular/common";
import { KeycloakService } from '../keycloak/keycloak.service';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list";
import { UserProfile } from '../keycloak/user.profile';
import { Router } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatIconModule,
    MatListModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit {
  private _userProfile: UserProfile | undefined

  constructor(
    private keycloakService: KeycloakService,
    private router: Router,
  ) {

  }

  ngOnInit() {
    if (this.keycloakService.profile) {
      this._userProfile = this.keycloakService.profile
    }
  }

  get userProfile() {
    return this._userProfile
  }

  addRecruiter() {
    this.router.navigate(['/recruiter'])
  }

  addContract() {
    this.router.navigate(['/contract/add'])
  }

}
