import { TestBed } from '@angular/core/testing';

import { FurnituremethodService } from './furnituremethod.service';

describe('FurnituremethodService', () => {
  let service: FurnituremethodService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(FurnituremethodService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
