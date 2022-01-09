import { TestBed } from '@angular/core/testing';
import { HttpClientTestingModule } from '@angular/common/http/testing';
import { HttpService } from './http.service';

describe('HttpService', () => {
  let httpService: HttpService;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports: [HttpClientTestingModule],
      providers: [HttpService],
    });

    httpService = TestBed.inject(HttpService);
  });

  it('should be created', () => {
    expect(httpService).toBeTruthy();
  });

  it('should have getData function', () => {
    expect(httpService.getData).toBeTruthy();
  });
  it('can test HttpClient.get', () => {
    expect(typeof httpService.getData()).toBe('object');
  });
});
