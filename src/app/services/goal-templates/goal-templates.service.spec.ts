import { TestBed } from '@angular/core/testing';

import { GoalTemplatesService } from './goal-templates.service';

describe('GoalTemplatesService', () => {
  let service: GoalTemplatesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(GoalTemplatesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
