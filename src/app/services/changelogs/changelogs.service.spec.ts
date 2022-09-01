import { TestBed } from '@angular/core/testing';

import { ChangelogsService } from './changelogs.service';

describe('ChangelogsService', () => {
  let service: ChangelogsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ChangelogsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
