import { ComponentFixture, TestBed } from '@angular/core/testing';

import { SettingsNavCmp } from './nav.cmp';

describe('NavCmp', () => {
  let component: SettingsNavCmp;
  let fixture: ComponentFixture<SettingsNavCmp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [SettingsNavCmp],
    }).compileComponents();

    fixture = TestBed.createComponent(SettingsNavCmp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
