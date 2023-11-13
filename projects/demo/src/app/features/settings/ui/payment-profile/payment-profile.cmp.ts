import {
  ChangeDetectionStrategy,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  Output,
  ViewChild,
} from '@angular/core';
import { PaymentProfile } from '../../../../../../../../functions/src/models';

@Component({
  selector: 'payment-profile',
  standalone: true,
  imports: [],
  template: `
    <div class="w-100 d-flex justify-content-between align-items-center">
      <div class="d-flex align-items-center">
        <!-- CARD ICON -->
        @switch (data.Brand) {
        <!-- MASTERCARD -->
        @case ('MasterCard') {<img class="card-brand" [src]="icons.mc" />}
        <!-- VISA -->
        @case ('VISA') { <img class="card-brand" [src]="icons.visa" /> }
        <!-- DEFAULT -->
        @default { <span>{{ data.Brand }}</span> } }

        <!-- CARD LAST 4 -->
        <span class="mx-2 text-nowrap"> ●●●● ●●●● ●●●● {{ data.Last4 }} </span>

        <!-- CARD EXPIRATION DATE -->
        <div class="mx-2 mx-sm-4">
          {{ data.Expiration.substring(4, 6) }}/{{
            data.Expiration.substring(2, 4)
          }}
        </div>
      </div>

      <!-- CARD OWNER -->
      <div class="mx-4 text-end align-middle d-none d-sm-block">
        <span class="text-nowrap">{{ data.CardOwner }}</span>
      </div>

      <!-- DELETE BUTTON -->
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

  icons = {
    mc: 'assets/mastercard-logo.svg',
    visa: 'assets/visa-logo.svg',
  };

  openDeleteDialog() {
    this.dialog?.nativeElement.showModal();
  }

  closeDeleteDialog() {
    this.dialog?.nativeElement.close();
  }
}
