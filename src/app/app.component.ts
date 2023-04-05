import { Component, TemplateRef } from '@angular/core';

import { DialogService } from './dialog/dialog.service';
import { DialogRef } from './dialog/dialog-ref';
import { ExampleComponent } from './example/example.component';

@Component({
  selector: 'my-app',
  templateUrl: './app.component.html',
  styleUrls: [ './app.component.css' ]
})
export class AppComponent  {
  constructor(private dialogService: DialogService) {}

  showDialog(): void {
    this.dialogService.open(ExampleComponent)
      .afterClosed()
      .subscribe(result => {
        console.log(`Closed with ${result}`);
      });
  }

  showDialogDisableClose(): void {
    this.dialogService.open(ExampleComponent, { disableClose: true })
      .afterClosed()
      .subscribe(result => {
        console.log(`Closed with ${result}`);
      });
  }

  showDialogWithData(): void {
    this.dialogService.open(ExampleComponent, {
        data: {
          message: 'Woehoe'
        }
      })
      .afterClosed()
      .subscribe(result => {
        console.log(`Closed with ${result}`);
      });
  }

  showDialogWithTemplate(template: TemplateRef<any>): void {
    this.dialogService.open(template, {
      data: {
        message: 'Woehoe'
      }
    });
  }
}
