import { ChangeDetectionStrategy, Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [CommonModule],
  template: `
    <header class="navbar bg-dark text-light" data-bs-theme="dark">
      <div class="container">
        <div class="navbar-brand fs-1 fw-bold">Cool Stuff Store</div>
      </div>
    </header>
  `,
  styles: ``,
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class HeaderCmp {}
