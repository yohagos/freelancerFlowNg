import { Injectable } from '@angular/core';
import { MatDialog } from "@angular/material/dialog";
import { ConfirmDialogComponent } from './confirm-dialog.component';

@Injectable({
  providedIn: 'root',
})
export class ConfirmDialogService {

  constructor(
    private _dialog: MatDialog,
  ) { }

  confirm() {
    const dialogRef = this._dialog.open(ConfirmDialogComponent, {
      width: '300px',
    })

    return dialogRef.afterClosed()
  }
}
