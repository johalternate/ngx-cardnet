import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'payment-profile-placeholder',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div class="placeholder-glow fade-in-500 fade-out-500">
      <div class="w-100 placeholder" style="height: 5em;"></div>
    </div>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class PaymentProfilePlaceholderCmp {}
