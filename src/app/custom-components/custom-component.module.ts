import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ConfirmDialogComponent } from './confirm-dialog/confirm-dialog.component';

@NgModule({
  declarations: [ConfirmDialogComponent],
  imports: [
    CommonModule
  ],
  exports: [
    ConfirmDialogComponent
  ]
})
export class CustomComponentModule { }
