import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from "@angular/material/button-toggle";
import { MatTabsModule } from "@angular/material/tabs";
import { NavigationEnd, NavigationStart, Router, RouterModule } from '@angular/router';
import { CommonModule } from '@angular/common';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';

@Component({
  selector: 'app-recruiters',
  standalone: true,
  imports: [
    MatTabsModule,
    MatButtonModule,
    MatButtonToggleModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './recruiters.component.html',
  styleUrl: './recruiters.component.scss'
})
export class RecruitersComponent {
  links: any[]
  activatedLink: any

  constructor() {
    this.links = [
      {
        label: 'Overview',
        link: '/recruiter/overview',
        index: 0
      },
      {
        label: 'Add',
        link: '/recruiter/add',
        index: 1
      },
      {
        label: 'Edit',
        link: '/recruiter/edit/:id',
        index: 2
      }
    ]
  }
}
