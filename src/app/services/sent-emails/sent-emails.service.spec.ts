import { TestBed } from '@angular/core/testing';

import { SentEmailsService } from './sent-emails.service';

describe('SentEmailsService', () => {
  let service: SentEmailsService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SentEmailsService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
