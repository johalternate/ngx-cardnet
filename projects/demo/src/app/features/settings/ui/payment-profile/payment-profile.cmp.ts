import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { PaymentProfile } from '../../../../../../../../functions/src/models';

@Component({
  selector: 'payment-profile',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="w-100 d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center">
        @switch (data.Brand) { @case ('MasterCard') {
        <img class="card-brand" src="assets/mastercard-logo.svg" />
        } @case ('VISA') {
        <img class="card-brand" src="assets/visa-logo.svg" />
        } @default {
        <span>{{ data.Brand }}</span>
        } }
        <span class="ms-2"> ●●●● ●●●● ●●●● {{ data.Last4 }} </span>
      </div>
      <div>
        {{ data.Expiration.substring(4, 6) }}/{{
          data.Expiration.substring(2, 4)
        }}
      </div>
      <div class="px-4" style="vertical-align: middle;">
        <span>{{ data.CardOwner }}</span>
      </div>
      <button class="btn btn-danger" (click)="delete.emit()">
        <i class="bi bi-trash"></i>
      </button>
    </div>

    <dialog #deleteDialog class="rounded-4">
      <div>
        <p class="">Are you sure you want to delete this card?</p>
      </div>
      <div class="d-flex justify-content-center" style="gap: 1em;">
        <button class="btn btn-danger">Delete</button>
        <button class="btn btn-dark" (click)="closeDeleteDialog()">
          Cancel
        </button>
      </div>
    </dialog>
  `,
  styles: `.card-brand { width: 3em; }`,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentProfileCmp {
  @Input({ required: true }) data!: PaymentProfile;
  @Output() delete = new EventEmitter<void>();
  @ViewChild('dialog') dialog?: ElementRef<HTMLDialogElement>;

  openDeleteDialog() {
    this.dialog?.nativeElement.showModal();
  }

  closeDeleteDialog() {
    this.dialog?.nativeElement.close();
  }
}
