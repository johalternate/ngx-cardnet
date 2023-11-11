import { ChangeDetectionStrategy, Component, signal } from '@angular/core';
import { JsonPipe } from '@angular/common';

import { FormsModule } from '@angular/forms';
import {
  CaptureButton,
  CheckoutProperties,
} from '../../../../ngx-cardnet/src/public-api';

@Component({
  selector: 'add-card',
  standalone: true,
  imports: [JsonPipe, CaptureButton, FormsModule],
  template: `
    <section class="mb-4">
      <h2>Agregar Tarjeta</h2>
      <form class="col-4">
        <div class="mb-3">
          <label for="uuid" class="form-label">Customer Unique ID</label>
          <input name="uuid" class="form-control" [(ngModel)]="cuid" />
          <div class="form-text"></div>
        </div>
        <button
          cardnet-capture
          [properties]="config"
          [cuid]="cuid"
          (token)="response.set($event)"
          class="btn btn-primary"
          role="button"
          [disabled]="!cuid"
        >
          Agregar Tarjeta
        </button>
      </form>
      <div class="col-8">
        @if (response(); as response) {
        <pre class="alert alert-primary">
          <h4>Response</h4>
          <p>{{ response | json }}</p>
        </pre>
        }
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCardCmp {
  cuid = '';
  config: CheckoutProperties = {
    name: 'Angular Shop',
    email: 'soporte@comercio.com',
    image:
      'https://raw.githubusercontent.com/angular/angular/main/aio/src/assets/images/logos/angular/angular.png',
    form_id: 'commerce_form',
    autoSubmit: 'false',
  };

  response = signal<unknown | null>(null);
}
