import { ComponentFixture, TestBed } from '@angular/core/testing';

import { ShopCmp } from './shop.cmp';

describe('ShopCmp', () => {
  let component: ShopCmp;
  let fixture: ComponentFixture<ShopCmp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [ShopCmp]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(ShopCmp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
