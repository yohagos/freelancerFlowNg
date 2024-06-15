import { Component, OnInit, inject } from '@angular/core';
import { Router } from '@angular/router';
import { ClientsService } from '../../../services/services';
import { ConfirmDialogService } from '../../../shared/confirm-dialog/confirm-dialog.service';
import { MatPaginatorModule, PageEvent } from '@angular/material/paginator';
import { ClientResponse, PageResponseClientResponse } from '../../../services/models';
import { CommonModule } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatExpansionModule } from '@angular/material/expansion';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-overview',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatButtonModule,
    MatCardModule,
    MatExpansionModule,
    MatIconModule,
    MatPaginatorModule
  ],
  templateUrl: './overview.component.html',
  styleUrl: './overview.component.scss'
})
export class OverviewComponent implements OnInit {

  private _router = inject(Router)
  private _clientService = inject(ClientsService)
  private _confirmDialogService = inject(ConfirmDialogService)

  size = 10
  page = 0
  pageIndex = 0
  pageEvent!: PageEvent

  clients: PageResponseClientResponse = {}

  ngOnInit() {
    this.loadData()
  }

  loadData() {
    this._clientService.getClients({
      page: this.page,
      size: this.size
    }).subscribe({
      next: (data) => {
        this.clients = data
      },
      error: (err) => console.log(err)
    })
  }

  handlePageEvent(event: PageEvent) {
    this.page = event.pageIndex
    this.loadData()
  }

  editClients(id: number | undefined) {
    this._router.navigate(['client/edit', id])
  }

  deleteClient(client: ClientResponse) {
    this._confirmDialogService.confirm().subscribe((result) => {
      if (result && client.id != null ) {
        this._clientService.deleteClient({
          clientId: client.id
        }).subscribe({
          next: () => {
            this.loadData()
          },
          error: (err) => {
            console.log(err)
          }
        })
      }
    })
  }

}
