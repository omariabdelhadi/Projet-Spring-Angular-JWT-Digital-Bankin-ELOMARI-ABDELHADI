import { ComponentFixture, TestBed } from '@angular/core/testing';

import { NoteAuthorizie } from './note-authorizie';

describe('NoteAuthorizie', () => {
  let component: NoteAuthorizie;
  let fixture: ComponentFixture<NoteAuthorizie>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      imports: [NoteAuthorizie],
    }).compileComponents();

    fixture = TestBed.createComponent(NoteAuthorizie);
    component = fixture.componentInstance;
    await fixture.whenStable();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
