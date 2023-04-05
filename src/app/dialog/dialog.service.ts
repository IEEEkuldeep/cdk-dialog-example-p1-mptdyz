import { ComponentType, Overlay } from '@angular/cdk/overlay';
import { ComponentPortal, PortalInjector, TemplatePortal } from '@angular/cdk/portal';
import { Injectable, InjectionToken, Injector, TemplateRef } from '@angular/core';

import { DialogConfig } from './dialog-config';
import { DialogRef } from './dialog-ref';
import { DialogComponent } from './dialog/dialog.component';

/**
 * Injection token that can be used to access the data that was passed in to a dialog.
 * */
export const DIALOG_DATA = new InjectionToken('dialog.data');

const defaultConfig: DialogConfig = {
  backdropClass: '',
  disableClose: false,
  panelClass: ''
};

/**
 * Service to open modal and manage dialogs.
 */
@Injectable({
  providedIn: 'root'
})
export class DialogService {
  constructor(private overlay: Overlay, private injector: Injector) { }

  open<D = any>(componentOrTemplate: ComponentType<any> | TemplateRef<any>, config: Partial<DialogConfig> = {}): DialogRef<D> {
    const dialogConfig: DialogConfig = Object.assign({}, defaultConfig, config);

    const overlayRef = this.overlay.create({
      hasBackdrop: true,
      positionStrategy: this.overlay.position()
        .global()
        .centerVertically()
        .centerHorizontally()
    });

    const dialogRef = new DialogRef(overlayRef, dialogConfig);

    const dialog = overlayRef.attach(new ComponentPortal(
      DialogComponent,
      null,
      new PortalInjector(
        this.injector,
        new WeakMap<any, any>([
          [DialogRef, dialogRef]
        ])
      )
    )).instance;

    if (componentOrTemplate instanceof TemplateRef) {
      // rendering a provided template dynamically
      dialog.attachTemplatePortal(
        new TemplatePortal(
          componentOrTemplate,
          null,
          {
            $implicit: config.data,
            dialog: dialogRef
          }
        )
      );
    } else {
      // rendering a provided component dynamically
      dialog.attachComponentPortal(
        new ComponentPortal(
          componentOrTemplate,
          null,
          new PortalInjector(
            this.injector,
            new WeakMap<any, any>([
              [DIALOG_DATA, config.data],
              [DialogRef, dialogRef]
            ])
          )
        )
      );

    }

    return dialogRef;
  }
}
