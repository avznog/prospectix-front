import { TestBed } from '@angular/core/testing';

import { StatHistoryService } from './stat-history.service';

describe('StatHistoryService', () => {
  let service: StatHistoryService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(StatHistoryService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
