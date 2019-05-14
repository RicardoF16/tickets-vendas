import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { FeedRedesSociaisPage } from './feed-redes-sociais.page';

describe('FeedRedesSociaisPage', () => {
  let component: FeedRedesSociaisPage;
  let fixture: ComponentFixture<FeedRedesSociaisPage>;

  beforeEach(async(() => {
    TestBed.configureTestingModule({
      declarations: [ FeedRedesSociaisPage ],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(FeedRedesSociaisPage);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });
});
