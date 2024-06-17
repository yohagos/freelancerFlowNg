import { Component, OnDestroy, OnInit, inject } from '@angular/core';
import { CommonModule } from "@angular/common";
import { KeycloakService } from '../keycloak/keycloak.service';
import { MatButtonModule } from "@angular/material/button";
import { MatIconModule } from "@angular/material/icon";
import { MatDividerModule } from "@angular/material/divider";
import { MatListModule } from "@angular/material/list";
import { MatGridListModule } from '@angular/material/grid-list';
import { UserProfile } from '../keycloak/user.profile';
import { Router } from '@angular/router';
import { MatCardModule } from '@angular/material/card';
import { EventHistoryService } from '../../services/services';
import { EventResponse, PageResponseEventResponse } from '../../services/models';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import { MatTableModule } from '@angular/material/table';
import { PartialEventResponse, convertToEventAdapter } from '../events/events.adapter';
import { Observable, catchError, of } from 'rxjs';


export interface Areas {
  title: string
  route: string
}

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    CommonModule,
    MatButtonModule,
    MatDividerModule,
    MatCardModule,
    MatIconModule,
    MatListModule,
    MatGridListModule,
    MatPaginatorModule,
    MatExpansionModule,
    MatIconModule,
    MatProgressSpinnerModule,
    MatTableModule
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss'
})
export class LoginComponent implements OnInit, OnDestroy {
  private _router = inject(Router)
  private _eventService = inject(EventHistoryService)
  private _keycloakService = inject(KeycloakService)
  private _userProfile: UserProfile | undefined

  recentEvents$!: Observable<PageResponseEventResponse>
  areas: Areas[] = [
    {
      title: 'Recruiters',
      route: '/recruiter'
    },
    {
      title: 'Clients',
      route: '/client'
    },
    {
      title: 'Projects',
      route: '/project'
    },
    {
      title: 'Contracts',
      route: '/contract'
    },
  ]

  loading = true

  pageIndex = 0
  page = 0
  size = 10

  ngOnInit() {
    if (this._keycloakService.profile) {
      this._userProfile = this._keycloakService.profile
    }

    this.recentEvents$ = this._eventService.recentEvents().pipe(
      catchError(err => {
        console.log(err)
        return of()
      })
    )

    this.loading = false
  }

  ngOnDestroy() {
    this.loading = true
  }

  get userProfile() {
    return this._userProfile
  }

  prepareData(events: EventResponse[] | undefined) {
    let data: PartialEventResponse[] = []
    if (events) {
      for (const ev of events) {
        data.push(convertToEventAdapter(ev))
      }
    }
    return data
  }

  goToComponent(path: string) {
    this._router.navigate([path])
  }

  getEventInformation(eventResponse: EventResponse) {
    return Object.entries(eventResponse)
      .filter(([key, value]) => value !== null && value !== undefined && !key.toLowerCase().includes('id') && !key.toLowerCase().includes('date'))
      .reduce((acc, [key, value]) => {
        acc[key] = value;
        return acc;
      }, {} as PartialEventResponse);
  }

  editEvent(er: EventResponse) {
    this._router.navigate([`${er?.category?.toLowerCase()}/edit/${er?.categoryId}`])
  }
}
