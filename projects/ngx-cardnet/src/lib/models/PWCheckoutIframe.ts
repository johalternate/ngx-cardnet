export interface PWCheckoutIframe {
  frameId: 'custom_iframe';
  modalId: 'custom_modal';
  frameHeight: number;
  frameWidth: number;
  Open(): void;
  Close(): void;
  OpenIframeWithPaymentMediaOptions(
    paymentMediaId?: string,
    issuerBank?: string
  ): void;
}
