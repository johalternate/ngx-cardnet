import { Injectable, NgZone, inject } from '@angular/core';
import { ScriptsService } from './scripts.service';
import { CARDNET_ENVIRONMENT } from '../tokens/cardnet-environment';
import { CARDNET_PUBLIC_KEY } from '../tokens/cardnet-public-key';
import { CheckoutProperties, PWCheckoutEvent } from '../models';
import { PWCheckoutIframe } from '../models/PWCheckoutIframe';

declare var PWCheckout: {
  AddActionButton(...args: any): void;
  /**
   * Agrega un callback a un evento
   */
  Bind(event: PWCheckoutEvent, callback: Function): void;
  /**
   * Remueve todos los callbacks asociados a un evento
   */
  GetSession(...args: any): void;
  GetToken(...args: any): void;
  HandleSession(...args: any): void;
  HandleToken(...args: any): void;
  /**
   * @private
   */
  Iframe: PWCheckoutIframe;
  Key: string;
  OpenIframeCustom(...args: any): void;
  OpenIframeNormal(...args: any): void;
  SetProperties(properties: CheckoutProperties): void;
  /**
   * @private
   */
  TokenCreated(...args: any): void;
  Unbind(event: PWCheckoutEvent): void;
};

@Injectable()
export class CardnetService {
  private readonly environment = inject(CARDNET_ENVIRONMENT);
  private readonly zone = inject(NgZone);
  private readonly publicKey = inject(CARDNET_PUBLIC_KEY);
  private readonly scripts = inject(ScriptsService);

  initialize(onReady: () => void) {
    const scriptUrl = `${this.environment}/servicios/tokens/v1/Scripts/PWCheckout.js?key=${this.publicKey}`;
    this.scripts.register(scriptUrl, 'PWCheckout', onReady);
  }

  config(properties: CheckoutProperties) {
    PWCheckout.SetProperties(properties);
  }

  bind(event: PWCheckoutEvent, fn: Function) {
    PWCheckout.Bind(event, fn);
  }

  openCaptureIFrame(uuid: string) {
    const url = `${this.environment}/servicios/tokens/v1/Capture/`;
    const params = `?key=${this.publicKey}&session_id=${uuid}`;
    PWCheckout.OpenIframeCustom(url + params, uuid);
  }
}
