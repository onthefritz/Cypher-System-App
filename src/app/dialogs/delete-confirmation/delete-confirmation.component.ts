import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent implements OnInit {
    title: string = ''
    message: string = ''
    okayButton: string = ''
    buttonStyle: string = 'warn'

    constructor(private dialogRef: DialogRef,
      @Inject(DIALOG_DATA) public data: any) { }

    ngOnInit(): void {
      this.title = this.data.title
      this.message = this.data.message
      this.okayButton = !this.data.okayButton ? 'DELETE' : this.data.okayButton

      if (this.okayButton.toLowerCase() === 'delete') {
        this.buttonStyle = 'warn'
      }
      else {
        this.buttonStyle = 'primary'
      }
    }

    remove() {
        this.dialogRef.close(true)
    }

    cancel() {
        this.dialogRef.close(false)
    }
}
