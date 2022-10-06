import { TestBed } from '@angular/core/testing';

import { NegativeAnswersService } from './negative-answers.service';

describe('NegativeAnswersService', () => {
  let service: NegativeAnswersService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(NegativeAnswersService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
