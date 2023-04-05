import { Component, OnInit, Inject, Optional } from '@angular/core';

import { DIALOG_DATA } from '../dialog/dialog.service';
import { DialogRef } from '../dialog/dialog-ref';

@Component({
  selector: 'app-example',
  templateUrl: './example.component.html',
  styleUrls: ['./example.component.css']
})
export class ExampleComponent {
  constructor(
    private dialogRef: DialogRef<string>,
    @Optional() @Inject(DIALOG_DATA) public data?: any
  ) {}

  closeManually(): void {
    this.dialogRef.close('Done');
  }
}