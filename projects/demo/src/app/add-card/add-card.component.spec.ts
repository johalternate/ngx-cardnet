import { ComponentFixture, TestBed } from '@angular/core/testing';

import { AddCardCmp } from './add-card.component';

describe('BasicExampleComponent', () => {
  let component: AddCardCmp;
  let fixture: ComponentFixture<AddCardCmp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [AddCardCmp],
    }).compileComponents();

    fixture = TestBed.createComponent(AddCardCmp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
