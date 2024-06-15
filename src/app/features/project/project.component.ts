import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { NavigationEnd, Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-project',
  standalone: true,
  imports: [
    MatTabsModule,
    MatButtonModule,
    MatButtonToggleModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './project.component.html',
  styleUrl: './project.component.scss'
})
export class ProjectComponent implements OnInit {
  links: any[]
  activatedLink: any
  displayTabs = true

  private _router = inject(Router)

  constructor() {
    this.links = [
      {
        label: 'Overview',
        link: '/project/overview',
        index: 0,
        disabled: false
      },
      {
        label: 'Add',
        link: '/project/add',
        index: 1,
        disabled: false
      },
      {
        label: 'Edit',
        link: '/project/edit/:id',
        index: 2,
        disabled: true
      }
    ]
  }

  ngOnInit() {
    this._router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        if (event.url.includes('logs')) {
          this.displayTabs = false
        } else {
          this.displayTabs = true
        }
      }
    })
  }
}
