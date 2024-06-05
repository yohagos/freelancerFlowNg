import { Injectable } from '@angular/core';
import Keycloak from 'keycloak-js';
import { UserProfile } from './user.profile';

@Injectable({
  providedIn: 'root'
})
export class KeycloakService {

  private _keyCloak: Keycloak | undefined
  private _profile: UserProfile | undefined

  get keyCloak() {
    if (!this._keyCloak) {
      this._keyCloak = new Keycloak({
        url: 'http://localhost:9090',
        realm: 'freelancer-flow-keycloak',
        clientId: 'freelancer-flow'
      })
    }
    return this._keyCloak
  }

  get profile() {
    return this._profile
  }

  constructor() { }

  async init() {
    const authenticated = await this.keyCloak.init({
      onLoad: 'login-required'
    })
    if (authenticated) {
      this._profile = (await this.keyCloak?.loadUserProfile()) as UserProfile
    }
  }

  login() {
    return this.keyCloak.login()
  }

  logout() {
    return this.keyCloak.logout({
      redirectUri: 'http://localhost:4200/login'
    })
  }
}
