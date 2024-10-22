import { provideHttpClient } from '@angular/common/http';
import { provideHttpClientTesting } from '@angular/common/http/testing';
import { TestBed } from '@angular/core/testing';
import { MyAPIService } from './my-api.service';

describe('MyAPIService', () => {
  let service: MyAPIService;

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [
        provideHttpClient(),
        provideHttpClientTesting()
      ]
    });
    service = TestBed.inject(MyAPIService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
