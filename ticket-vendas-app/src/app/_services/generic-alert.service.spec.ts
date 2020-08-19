import { TestBed } from '@angular/core/testing';

import { GenericAlertService } from './generic-alert.service';

describe('GenericAlertService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: GenericAlertService = TestBed.get(GenericAlertService);
    expect(service).toBeTruthy();
  });
});
