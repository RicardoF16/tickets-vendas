import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { VisaoEventoPage } from './visao-evento.page';

describe('VisaoEventoPage', () => {
  let component: VisaoEventoPage;
  let fixture: ComponentFixture<VisaoEventoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ VisaoEventoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(VisaoEventoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
