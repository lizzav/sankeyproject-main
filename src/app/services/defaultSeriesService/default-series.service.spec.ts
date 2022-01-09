import { TestBed } from '@angular/core/testing';

import { DefaultSeriesService } from './default-series.service';
import defaultSeries from '../../consts/default-series.const';

describe('DefaultSeriesService', () => {
  let service: DefaultSeriesService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(DefaultSeriesService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });

  it('should be contain defaultSeries', () => {
    expect(service.getSeries).toEqual(defaultSeries);
  });
});
