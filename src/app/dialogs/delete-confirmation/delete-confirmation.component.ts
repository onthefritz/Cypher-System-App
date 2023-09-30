import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent {

    constructor(private dialogRef: DialogRef) { }

    remove() {
        this.dialogRef.close(true)
    }

    cancel() {
        this.dialogRef.close(false)
    }
}
