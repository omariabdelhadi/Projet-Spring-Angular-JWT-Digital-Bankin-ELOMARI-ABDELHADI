import { ComponentFixture, TestBed } from '@angular/core/testing';

import { CustomerUpdate } from './customer-update';


describe('CustomerUpdate', () => {
  let component: CustomerUpdate;
  let fixture: ComponentFixture<CustomerUpdate>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [CustomerUpdate],
    }).compileComponents();

    fixture = TestBed.createComponent(CustomerUpdate);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
