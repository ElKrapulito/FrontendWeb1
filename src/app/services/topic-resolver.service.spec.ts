import { TestBed } from '@angular/core/testing';

import { TopicResolverService } from './topic-resolver.service';

describe('TopicResolverService', () => {
  let service: TopicResolverService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TopicResolverService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
