import { Component, EventEmitter, Input, Output, inject } from '@angular/core';
import { CheckoutProperties } from '../models';
import { BehaviorSubject } from 'rxjs';
import { CardnetService } from '../services/cardnet.service';
import { ScriptsService } from '../services/scripts.service';
import { CapturedCardToken as Token } from '../models/captured-card-token';

@Component({
  selector: '[cardnet-capture]',
  standalone: true,
  providers: [CardnetService, ScriptsService],
  host: { '(click)': 'open()' },
  template: `
    <ng-content />

    <form [id]="properties.form_id">
      <input
        style="display: none;"
        type="hidden"
        id="PWTokenAux"
        name="PWTokenAux"
      />
    </form>
  `,
})
export class CaptureButton {
  cardnet = inject(CardnetService);
  /**
   * Objeto de configuracion
   */
  @Input({ required: true }) properties!: CheckoutProperties;
  /**
   * ID unico del cliente
   */
  @Input({ required: true }) cuid!: string;
  /**
   * Emite cuando el objeto PWCheckout ha cargado en el scope global
   */
  @Output() ready = new EventEmitter<void>();
  /**
   * Emite el token de captura cuando ha sido creado
   */
  @Output() token = new EventEmitter<Token>();

  readonly loading$ = new BehaviorSubject(true);

  ngOnInit() {
    this.cardnet.initialize(() => this.onReady());
  }

  private onReady() {
    this.loading$.next(false);
    this.cardnet.config(this.properties);
    this.cardnet.bind('tokenCreated', (token: Token) => this.token.emit(token));
  }

  open() {
    this.cardnet.openCaptureIFrame(this.cuid);
  }
}
