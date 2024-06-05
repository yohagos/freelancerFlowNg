import { APP_INITIALIZER, ApplicationConfig, importProvidersFrom } from '@angular/core';
import { provideRouter } from '@angular/router';

import { routes } from './app.routes';
import { httpTokenInterceptor } from "./core/interceptors/http-token.interceptor";
import { KeycloakService } from "./core/keycloak/keycloak.service";
import { HTTP_INTERCEPTORS, provideHttpClient, withInterceptors } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';


export function kcFactory(kcService: KeycloakService) {
  return () => kcService.init()
}

const providers = [
  FormsModule,
  ReactiveFormsModule,
  CommonModule,
  BrowserModule,
  BrowserAnimationsModule,
]

export const appConfig: ApplicationConfig = {
  providers: [
    provideRouter(routes),
    {
      provide: APP_INITIALIZER,
      deps: [KeycloakService],
      useFactory: kcFactory,
      multi: true
    },
    provideHttpClient(withInterceptors([httpTokenInterceptor])),
    importProvidersFrom(providers)
  ]
};
