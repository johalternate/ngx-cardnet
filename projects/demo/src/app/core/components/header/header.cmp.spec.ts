import { ComponentFixture, TestBed } from '@angular/core/testing';

import { HeaderCmp } from './header.cmp';

describe('HeaderCmp', () => {
  let component: HeaderCmp;
  let fixture: ComponentFixture<HeaderCmp>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [HeaderCmp]
    })
    .compileComponents();
    
    fixture = TestBed.createComponent(HeaderCmp);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
