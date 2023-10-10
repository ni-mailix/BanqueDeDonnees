import { TestBed } from '@angular/core/testing';

import { KpiStatService } from './kpi-stat.service';

describe('KpiStatService', () => {
  let service: KpiStatService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(KpiStatService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
