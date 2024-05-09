import { Injectable } from "@angular/core";
import { MatSnackBar } from "@angular/material/snack-bar";

@Injectable({
  providedIn : 'root'
})
export class SnackBarComponent {
  constructor(
    private _snackBar: MatSnackBar,
  ) {}
  openSnackBar(message: string, action: string) {
    this._snackBar.open(message, action, {
      duration: 7000,
    });
  }
}