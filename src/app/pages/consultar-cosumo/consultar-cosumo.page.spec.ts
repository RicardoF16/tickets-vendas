import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ConsultarCosumoPage } from './consultar-cosumo.page';

describe('ConsultarCosumoPage', () => {
  let component: ConsultarCosumoPage;
  let fixture: ComponentFixture<ConsultarCosumoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ConsultarCosumoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ConsultarCosumoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
