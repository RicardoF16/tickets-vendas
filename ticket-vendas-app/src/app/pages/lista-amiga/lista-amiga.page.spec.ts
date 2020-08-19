import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { ListaAmigaPage } from './lista-amiga.page';

describe('ListaAmigaPage', () => {
  let component: ListaAmigaPage;
  let fixture: ComponentFixture<ListaAmigaPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ ListaAmigaPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(ListaAmigaPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
