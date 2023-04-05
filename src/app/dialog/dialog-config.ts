/**
 * Configuration for opening a modal dialog with the Dialog service.
 */
export interface DialogConfig<T = any> {
  backdropClass: string;
  data?: T;
  disableClose: boolean;
  panelClass: string | string[];
}