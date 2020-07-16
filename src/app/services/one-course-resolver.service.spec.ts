import { TestBed } from '@angular/core/testing';

import { OneCourseResolverService } from './one-course-resolver.service';

describe('OneCourseResolverService', () => {
  let service: OneCourseResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(OneCourseResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
