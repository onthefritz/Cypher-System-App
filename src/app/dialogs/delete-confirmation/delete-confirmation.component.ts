import { DialogRef, DIALOG_DATA } from '@angular/cdk/dialog';
import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';
import { BASE_URL } from 'src/app/helpers/constants';

@Component({
  selector: 'app-delete-confirmation',
  templateUrl: './delete-confirmation.component.html',
  styleUrls: ['./delete-confirmation.component.scss']
})
export class DeleteConfirmationComponent {

    constructor(private http: HttpClient, private dialogRef: DialogRef,
        @Inject(DIALOG_DATA) public data: string) { }

    deleteCharacter(characterId: string) {
        this.http.delete(`${BASE_URL}/character/delete/${characterId}`).subscribe({
            next: () => {
                this.dialogRef.close()
            },
            error: (error) => {
                console.log(error)
            }
        })
    }

    close() {
        this.dialogRef.close()
    }
}
