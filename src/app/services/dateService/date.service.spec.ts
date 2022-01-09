import { TestBed } from '@angular/core/testing';
import months from '../../consts/months.const';
import { DateService } from './date.service';

describe('DateService', () => {
  let service: DateService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DateService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be contain months', () => {
    expect(service.getMonths).toEqual(months);
  });
});
