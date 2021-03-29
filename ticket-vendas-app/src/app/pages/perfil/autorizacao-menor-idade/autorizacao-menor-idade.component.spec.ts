import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AutorizacaoMenorIdadeComponent } from './autorizacao-menor-idade.component';

describe('AutorizacaoMenorIdadeComponent', () => {
  let component: AutorizacaoMenorIdadeComponent;
  let fixture: ComponentFixture<AutorizacaoMenorIdadeComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AutorizacaoMenorIdadeComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AutorizacaoMenorIdadeComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
