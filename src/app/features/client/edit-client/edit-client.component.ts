import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from '../../../services/services';
import { ClientRequest, ClientResponse } from '../../../services/models';

@Component({
  selector: 'app-edit-client',
  standalone: true,
  imports: [
    CommonModule,
    MatInputModule,
    MatCardModule,
    MatButtonModule,
    MatFormFieldModule,
    FormsModule,
    ReactiveFormsModule
  ],
  templateUrl: './edit-client.component.html',
  styleUrl: './edit-client.component.scss'
})
export class EditClientComponent implements OnInit {
  private _router = inject(Router)
  private _activatedRoute = inject(ActivatedRoute)
  private _clientService = inject(ClientsService)
  private previousCLient!: ClientResponse
  private fb = inject(FormBuilder)
  clientForm: FormGroup = this.fb.group({
    clientName: new FormControl('', Validators.required),
    clientEmail: new FormControl('', [Validators.required, Validators.email]),
    companyName: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    website: new FormControl('')
  })

  ngOnInit() {
    let id = this._activatedRoute.snapshot.paramMap.get('id')
    if (id !== null) {
      this._clientService.getClient({
        clientId: id as any
      }).subscribe({
        next: (data) => {
          this.previousCLient = data
          this.fillForm(data)
        }
      })
    }
  }

  fillForm(client: ClientResponse) {
    this.clientForm = this.fb.group({
      clientName: new FormControl(client.clientName, Validators.required),
      clientEmail: new FormControl(client.clientEmail, [Validators.required, Validators.email]),
      companyName: new FormControl(client.companyName, Validators.required),
      phone: new FormControl(client.phone, Validators.required),
      website: new FormControl(client.website)
    })
  }

  editClient() {
    const editedClient = this.prepareData()
    this._clientService.updateClient({
      body: editedClient
    }).subscribe({
      next: () => {
        this._router.navigate(['/client/overview'])
      },
      error: (err) => {
        console.log(err)
      }
    })
  }

  prepareData() {
    const client: ClientRequest = {
      id: this.previousCLient.id,
      clientEmail: this.clientForm.get('clientEmail')?.value,
      clientName: this.clientForm.get('clientName')?.value,
      companyName: this.clientForm.get('companyName')?.value,
      phone: this.clientForm.get('phone')?.value,
      website: this.clientForm.get('website')?.value
    }
    return client
  }

  cancel() {
    this._router.navigate(['/client/overview'])
  }
}
