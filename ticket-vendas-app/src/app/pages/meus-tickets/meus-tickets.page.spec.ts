import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { MeusTicketsPage } from './meus-tickets.page';

describe('MeusTicketsPage', () => {
  let component: MeusTicketsPage;
  let fixture: ComponentFixture<MeusTicketsPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ MeusTicketsPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(MeusTicketsPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
