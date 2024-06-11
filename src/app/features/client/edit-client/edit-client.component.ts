import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ActivatedRoute, Router } from '@angular/router';
import { ClientsService } from '../../../services/services';
import { ClientResponse } from '../../../services/models';

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
          console.log(data)
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

  editRecruiter() {

  }

  cancel() {
    this._router.navigate(['/recruiter/overview'])
  }
}
