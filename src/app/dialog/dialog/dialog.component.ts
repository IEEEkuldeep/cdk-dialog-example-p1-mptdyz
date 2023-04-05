import { BasePortalOutlet, CdkPortalOutlet, ComponentPortal, TemplatePortal } from '@angular/cdk/portal';
import { Component, ComponentRef, EmbeddedViewRef, ViewChild } from '@angular/core';

/**
 * Internal component that wraps user-provided dialog content.
 */
@Component({
  selector: 'p1-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent extends BasePortalOutlet {
  @ViewChild(CdkPortalOutlet) portalOutlet: CdkPortalOutlet;

  constructor() {
    super();
  }

  attachComponentPortal<T>(componentPortal: ComponentPortal<any>): ComponentRef<T> {
    return this.portalOutlet.attachComponentPortal(componentPortal);
  }

  attachTemplatePortal<C>(portal: TemplatePortal<C>): EmbeddedViewRef<C> {
    return this.portalOutlet.attachTemplatePortal(portal);
  }
}
