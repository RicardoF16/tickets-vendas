import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ComprarCreditosPage } from './comprar-creditos.page';

describe('ComprarCreditosPage', () => {
  let component: ComprarCreditosPage;
  let fixture: ComponentFixture<ComprarCreditosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ComprarCreditosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ComprarCreditosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
