import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { EscolherIngressoPage } from './escolher-ingresso.page';

describe('EscolherIngressoPage', () => {
  let component: EscolherIngressoPage;
  let fixture: ComponentFixture<EscolherIngressoPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ EscolherIngressoPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(EscolherIngressoPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
