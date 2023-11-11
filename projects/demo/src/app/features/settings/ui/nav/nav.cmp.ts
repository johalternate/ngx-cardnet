import { ChangeDetectionStrategy, Component } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'settings-nav',
  standalone: true,
  imports: [RouterLink],
  template: `
    <ul class="nav flex-column py-2">
      @for (item of items; track $index) {
      <li class="nav-item">
        <a
          class="nav-link fw-bold"
          [class.disabled]="item.link == ''"
          [routerLink]="item.link"
          >{{ item.label }}</a
        >
      </li>
      }
    </ul>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsNavCmp {
  items = [
    { link: '', label: 'Profile' },
    { link: '', label: 'Email & Password' },
    { link: '', label: 'History' },
    { link: 'billing', label: 'Billing' },
  ];
}
