import { Directive, HostListener, Input, Optional } from '@angular/core';

import { DialogRef } from './dialog-ref';

/**
 * Button that will close the current dialog.
 */
@Directive({
  selector: '[p1DialogClose]'
})
export class DialogCloseDirective<T = any> {
  @Input('p1DialogClose') dialogResult: T;

  constructor(
    @Optional() private dialogRef: DialogRef<T>
  ) {}

  @HostListener('click') onClick(): void {
    if (!this.dialogRef) {
      console.error('p1DialogClose is not supported within a template');

      return;
    }

    this.dialogRef.close(this.dialogResult);
  }
}
