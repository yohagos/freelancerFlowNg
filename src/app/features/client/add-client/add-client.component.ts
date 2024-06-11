import { CommonModule } from '@angular/common';
import { Component, inject } from '@angular/core';
import { FormBuilder, FormControl, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { ClientsService } from '../../../services/services';
import { ClientRequest } from '../../../services/models';
import { Router } from '@angular/router';

@Component({
  selector: 'app-add-client',
  standalone: true,
  imports: [
    CommonModule,
    FormsModule,
    ReactiveFormsModule,
    MatFormFieldModule,
    MatButtonModule,
    MatCardModule,
    MatInputModule,
  ],
  templateUrl: './add-client.component.html',
  styleUrl: './add-client.component.scss'
})
export class AddClientComponent {
  private router = inject(Router)
  private _clientService = inject(ClientsService)
  private fb = inject(FormBuilder)
  clientForm: FormGroup = this.fb.group({
    clientName: new FormControl('', Validators.required),
    clientEmail: new FormControl('', [Validators.required, Validators.email]),
    companyName: new FormControl('', Validators.required),
    phone: new FormControl('', Validators.required),
    website: new FormControl('')
  })

  addClient() {
    if (this.clientForm.valid && this.clientForm.dirty) {
      const req = this.prepareRequest()
      this._clientService.saveClient({
        body: req
      }).subscribe({
        next: () => {
          this.router.navigate(['/client'])
        },
        error: (err) => {
          console.error(err.error)
        }
      })
    }
  }

  prepareRequest() {
    const request: ClientRequest = {
      clientEmail: this.clientForm.get('clientEmail')?.value,
      clientName: this.clientForm.get('clientName')?.value,
      companyName: this.clientForm.get('companyName')?.value,
      phone: this.clientForm.get('phone')?.value,
      website: this.clientForm.get('website')?.value
    }
    return request
  }

  clear() {
    const controls = Object.keys(this.clientForm.controls)
    controls.forEach(elem => {
      this.clientForm.controls[elem].setValue('')
    })
    this.clientForm.markAsUntouched()
  }

}

