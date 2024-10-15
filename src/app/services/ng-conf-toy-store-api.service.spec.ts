import { HttpClientTestingModule } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { NgConfToyStoreAPIService } from './ng-conf-toy-store-api.service';

describe('NgConfToyStoreAPIService', () => {
  let service: NgConfToyStoreAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule]
    });
    service = TestBed.inject(NgConfToyStoreAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
