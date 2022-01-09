import { Injectable } from '@angular/core';
import defaultSeries from '../../consts/default-series.const';
/**
 * Предоставление начального значения sankey в компоненты
 */
@Injectable({
  providedIn: 'root',
})
export class DefaultSeriesService {
  /**
   * Список серий
   */
  private series: any;

  /**
   * Инициализация объекта
   */
  constructor() {
    this.series = defaultSeries;
  }

  /**
   * функция для получения серии
   * @return series массив серий
   */
  public get getSeries(): any {
    return this.series.slice();
  }
}
