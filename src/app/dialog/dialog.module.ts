import { OverlayModule } from '@angular/cdk/overlay';
import { PortalModule } from '@angular/cdk/portal';
import { CommonModule } from '@angular/common';
import { NgModule } from '@angular/core';

import { DialogCloseDirective } from './dialog-close.directive';
import { DialogComponent } from './dialog/dialog.component';

@NgModule({
  declarations: [DialogComponent, DialogCloseDirective],
  imports: [
    CommonModule,
    OverlayModule,
    PortalModule
  ],
  exports: [
    DialogCloseDirective
  ],
  entryComponents: [DialogComponent]
})
export class DialogModule { }
