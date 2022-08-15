import { TestBed } from '@angular/core/testing';

import { DataThemeService } from './data-theme.service';

describe('DataThemeService', () => {
  let service: DataThemeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DataThemeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
