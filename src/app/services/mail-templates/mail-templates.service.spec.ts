import { TestBed } from '@angular/core/testing';

import { MailTemplatesService } from './mail-templates.service';

describe('MailTemplatesService', () => {
  let service: MailTemplatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(MailTemplatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
