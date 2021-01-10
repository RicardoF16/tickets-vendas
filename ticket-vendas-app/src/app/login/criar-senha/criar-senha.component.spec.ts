import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { CriarSenhaComponent } from './criar-senha.component';

describe('CriarSenhaComponent', () => {
  let component: CriarSenhaComponent;
  let fixture: ComponentFixture<CriarSenhaComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ CriarSenhaComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(CriarSenhaComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
