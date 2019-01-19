import { TestBed, inject } from '@angular/core/testing';

import { MovementRulesService } from './movement-rules.service';

describe('MovementRulesService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [MovementRulesService]
    });
  });

  it('should be created', inject([MovementRulesService], (service: MovementRulesService) => {
    expect(service).toBeTruthy();
  }));
});
