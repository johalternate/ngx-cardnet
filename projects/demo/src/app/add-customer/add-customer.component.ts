import {
  ChangeDetectionStrategy,
  Component,
  EventEmitter,
  Output,
  inject,
  signal,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import {
  CreateCustomerDTO,
  Customer,
} from '../../../../../functions/src/models';
import { Functions, httpsCallable } from '@angular/fire/functions';

@Component({
  selector: 'add-customer',
  standalone: true,
  imports: [CommonModule, FormsModule],
  template: `
    <section class="mb-4 row">
      <h3>Agregar Cliente</h3>
      <form class="col-4">
        <div class="mb-3 input-group">
          <label for="fn" class="input-group-text">Nombre</label>
          <input name="fn" class="form-control" [(ngModel)]="model.FirstName" />
        </div>
        <div class="mb-3 input-group">
          <label for="ln" class="input-group-text">Apellido</label>
          <input name="ln" class="form-control" [(ngModel)]="model.LastName" />
        </div>
        <div class="mb-3 input-group">
          <label for="email" class="input-group-text">Email</label>
          <input name="email" class="form-control" [(ngModel)]="model.Email" />
        </div>
        <button class="btn btn-primary" role="button" (click)="addCustomer()">
          Agregar
        </button>
      </form>
      <div class="col-8">
        @if (customer(); as customer) {
        <pre class="alert alert-primary">
          <h4>Response</h4>
          <p>{{ customer | json }}</p>
        </pre>
        }
      </div>
    </section>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AddCustomerCmp {
  @Output() addedCustomer = new EventEmitter<Customer>();

  functions = inject(Functions);

  addCustomerFn = httpsCallable<
    CreateCustomerDTO,
    { payload: Customer; errors: unknown[] }
  >(this.functions, 'addCustomer');
  getCustomerFn = httpsCallable<
    string,
    { payload: Customer; errors: unknown[] }
  >(this.functions, 'getCustomer');

  customer = signal<Customer | null>(null);

  model: CreateCustomerDTO = {
    FirstName: '',
    LastName: '',
    Email: '',
  };

  ngOnInit() {
    this.getCustomerFn('50546').then((res) => {
      this.customer.set(res.data.payload);
      this.addedCustomer.emit(res.data.payload);
      this.model = res.data.payload;
    });
  }

  addCustomer() {
    this.addCustomerFn(this.model).then((res) => {
      this.customer.set(res.data.payload);
      this.addedCustomer.emit(res.data.payload);
    });
  }
}
