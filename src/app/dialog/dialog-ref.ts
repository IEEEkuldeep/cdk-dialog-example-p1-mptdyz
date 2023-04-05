import { OverlayRef } from '@angular/cdk/overlay';
import { Observable, Subject } from 'rxjs';
import { filter } from 'rxjs/operators';

import { DialogConfig } from './dialog-config';

/**
 * Reference to a dialog opened via the Dialog service.
 */
export class DialogRef<T = any> {
  private afterClosedSubject = new Subject<T>();

  constructor(private overlayRef: OverlayRef, private config: DialogConfig) {
    if (!config.disableClose) {
      this.overlayRef.backdropClick().subscribe(() => {
        this.close();
      });

      this.overlayRef.keydownEvents().pipe(
        filter(event => event.key === 'Escape')
      ).subscribe(() => {
        this.close();
      });
    }
  }

  close(dialogResult?: T): void {
    this.afterClosedSubject.next(dialogResult);
    this.afterClosedSubject.complete();

    this.overlayRef.dispose();
  }

  afterClosed(): Observable<T> {
    return this.afterClosedSubject.asObservable();
  }
}