import { ChangeDetectionStrategy, Component, inject } from '@angular/core';
import { HeaderCmp } from './core/components/header/header.cmp';
import { RouterOutlet } from '@angular/router';
import { AppCheck, getToken } from '@angular/fire/app-check';

@Component({
  changeDetection: ChangeDetectionStrategy.OnPush,
  selector: 'app-root',
  standalone: true,
  imports: [HeaderCmp, RouterOutlet],
  template: `
    <app-header />
    <div class="container">
      <router-outlet />
    </div>
  `,
})
export class AppComponent {
  appCheck = inject(AppCheck);

  ngOnInit() {
    getToken(this.appCheck, true);
  }
}
