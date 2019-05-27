import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprarBilhetePage } from './comprar-bilhete.page';

describe('ComprarBilhetePage', () => {
  let component: ComprarBilhetePage;
  let fixture: ComponentFixture<ComprarBilhetePage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprarBilhetePage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprarBilhetePage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
