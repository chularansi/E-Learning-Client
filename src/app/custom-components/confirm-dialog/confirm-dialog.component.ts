import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { ModalDialog } from 'src/app/models/modal-dialog';

@Component({
  selector: 'app-confirm-dialog',
  templateUrl: './confirm-dialog.component.html',
  styleUrls: ['./confirm-dialog.component.css']
})
export class ConfirmDialogComponent implements OnInit {
  @Input() modalDialog: ModalDialog = {
    title: 'Title', description: 'Description', ok: 'Ok', cancel: 'Cancel'
  };

  // tslint:disable-next-line: no-output-on-prefix
  @Output() onConfirmClicked = new EventEmitter<boolean>();

  constructor() { }

  ngOnInit(): void {
  }

  onConfirm(): any {
    return this.onConfirmClicked.emit(true);
  }
}
