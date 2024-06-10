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
import { ClientEntity, ContractEntity, EventResponse, PageResponseEventResponse, ProjectEntity, RecruiterEntity, WorkLogEntity } from '../../services/models';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatProgressSpinnerModule } from "@angular/material/progress-spinner";
import {MatTableModule} from '@angular/material/table';

interface ContentInterface {
  clientName?: string
  clientEmail?: string
  companyName?: string
  projectName?: string
  startDate?: string
  endDate?: string
  agency?: string
  email?: string
  name?: string
  workDate?: string
  [key: string]: any
}

export interface Areas {
  title: string
  route: string
}

interface ChildAreas {
  project?: ProjectEntity
  client?: ClientEntity
  contract?: ContractEntity
  recruiter?: RecruiterEntity
  workLog?: WorkLogEntity
  [key: string]: any
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
  private _eventService = inject(EventHistoryService)
  private _userProfile: UserProfile | undefined
  recentEvents!: PageResponseEventResponse
  areas: Areas[] = []

  loading = true

  pageIndex = 0
  page = 0
  size = 10

  constructor(
    private keycloakService: KeycloakService,
    private router: Router,
  ) {
    this.areas = [
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
        title: 'Work Logs',
        route: '/workLog'
      },
      {
        title: 'Contracts',
        route: '/contract'
      },
    ]
  }

  ngOnInit() {
    if (this.keycloakService.profile) {
      this._userProfile = this.keycloakService.profile
    }
    this._eventService.recentEvents().subscribe({
      next: (data) => {
        this.recentEvents = data
        this.loading = false
      }
    })
  }

  ngOnDestroy() {
    this.loading = true
  }

  get userProfile() {
    return this._userProfile
  }

  goToComponent(path: string) {
    this.router.navigate([path])
  }

  getNotEmptyObject(event: EventResponse) {
    let objs: ChildAreas = {
      project: event.project,
      client: event.client,
      contract: event.contract,
      recruiter: event.recruiter,
      workLog: event.workLog
    }

    for (const key in objs) {
      const obj = objs[key]
      if (obj && Object.keys(obj).length > 0) {
        return this.transformData(key, obj)
      }
    }
    return
  }

  transformData(key: string, obj: any) {
    let content: ContentInterface = {}
    switch (key) {
      case 'recruiter':
        content.agency = obj?.agency
        content.name = obj?.name
        content.email = obj?.email
        break
      case 'project':
        content.projectName = obj?.projectName
        content.startDate = obj?.startDate
        content.endDate = obj?.endDate
        break
      case 'client':
        content.clientName = obj?.clientName
        content.clientEmail = obj?.clientEmail
        content.companyName = obj?.companyName
        break
      case 'contract':
        content.projectName = obj?.projectName
        content.startDate = obj?.startDate
        content.endDate = obj?.endDate
        break
      case 'workLog':
        content.projectName = obj?.projectName
        content.workDate = obj?.workDate
        break
      default:
        console.log('error')
        break
    }
    return content
  }

  openEventHistory(eventResponse: EventResponse) {
    let objs: ChildAreas = {
      project: eventResponse.project,
      client: eventResponse.client,
      contract: eventResponse.contract,
      recruiter: eventResponse.recruiter,
      workLog: eventResponse.workLog
    }

    for (const key in objs) {
      const obj = objs[key]
      if (obj && Object.keys(obj).length > 0) {
        this.router.navigate([`/${key}/edit/${obj.id}`])
      }
    }
  }

}
