import { Injectable, NgZone, inject } from '@angular/core';

@Injectable()
export class ScriptsService {
  protected zone = inject(NgZone);

  register(url: string, global: string, onReady: (global: any) => void) {
    const existing = (window as any)[global];
    if (existing) {
      // global variable is present = script was already loaded
      this.zone.run(() => {
        onReady(existing);
      });
      return;
    }

    // prepare script elem
    const elem = document.createElement('script');
    elem.id = this.getElemId(global);
    elem.innerHTML = '';
    elem.onload = () => this.zone.run(() => onReady((window as any)[global]));
    elem.src = url;
    elem.async = true;
    elem.defer = true;

    // add script to header
    document.getElementsByTagName('head')[0].appendChild(elem);
  }

  cleanup(global: string): void {
    // remove script from DOM
    const elem = document.getElementById(this.getElemId(global));
    if (elem) elem.remove();
  }

  private getElemId(global: string): string {
    return `ngx-paypal-script-elem-${global}`;
  }
}
