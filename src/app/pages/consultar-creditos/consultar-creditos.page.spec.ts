import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarCreditosPage } from './consultar-creditos.page';

describe('ConsultarCreditosPage', () => {
  let component: ConsultarCreditosPage;
  let fixture: ComponentFixture<ConsultarCreditosPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultarCreditosPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarCreditosPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
