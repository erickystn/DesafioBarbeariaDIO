import { Injectable } from '@angular/core';
import { ISnackbarManagerService } from './isnackbar-manager.service';
import { MatSnackBar } from '@angular/material/snack-bar';

@Injectable({
  providedIn: 'root'
})
export class SnackbarManagerService implements ISnackbarManagerService {

  constructor(private readonly snabar: MatSnackBar) { }
  show(message: string, action: string = "Fechar", duration:number = 3000): void {
    this.snabar.open(message, action, {duration, verticalPosition: 'top', horizontalPosition: 'right'});
  }
}
