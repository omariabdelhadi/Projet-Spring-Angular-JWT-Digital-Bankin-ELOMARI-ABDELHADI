import { ComponentFixture, TestBed } from '@angular/core/testing';

import { Newcustomer } from './newcustomer';

describe('Newcustomer', () => {
  let component: Newcustomer;
  let fixture: ComponentFixture<Newcustomer>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [Newcustomer],
    }).compileComponents();

    fixture = TestBed.createComponent(Newcustomer);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
