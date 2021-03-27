import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AdquirirIngressosComponent } from './adquirir-ingressos.component';

describe('AdquirirIngressosComponent', () => {
  let component: AdquirirIngressosComponent;
  let fixture: ComponentFixture<AdquirirIngressosComponent>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ AdquirirIngressosComponent ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(AdquirirIngressosComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
