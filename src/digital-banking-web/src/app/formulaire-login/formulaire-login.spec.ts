import { ComponentFixture, TestBed } from '@angular/core/testing';

import { FormulaireLogin } from './formulaire-login';

describe('FormulaireLogin', () => {
  let component: FormulaireLogin;
  let fixture: ComponentFixture<FormulaireLogin>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [FormulaireLogin],
    }).compileComponents();

    fixture = TestBed.createComponent(FormulaireLogin);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
