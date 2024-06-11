import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatButtonToggleModule } from '@angular/material/button-toggle';
import { MatTabsModule } from '@angular/material/tabs';
import { RouterModule } from '@angular/router';

@Component({
  selector: 'app-client',
  standalone: true,
  imports: [
    MatTabsModule,
    MatButtonModule,
    MatButtonToggleModule,
    CommonModule,
    RouterModule
  ],
  templateUrl: './client.component.html',
  styleUrl: './client.component.scss'
})
export class ClientComponent {
  links: any[]
  activatedLink: any

  constructor() {
    this.links = [
      {
        label: 'Overview',
        link: '/client/overview',
        index: 0,
        disabled: false
      },
      {
        label: 'Add',
        link: '/client/add',
        index: 1,
        disabled: false
      },
      {
        label: 'Edit',
        link: '/client/edit/:id',
        index: 2,
        disabled: true
      }
    ]
  }
}
