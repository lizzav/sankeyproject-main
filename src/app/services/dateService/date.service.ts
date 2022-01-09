import { Injectable } from '@angular/core';
import months from '../../consts/months.const';
/**
 * Предоставление списка месяцев в компоненты
 */
@Injectable({
  providedIn: 'root',
})
export class DateService {
  /**
   * Список месяцев
   */
  private months: Array<string>;

  /**
   * Создание объекта
   */
  constructor() {
    this.months = months;
  }

  /**
   * функция для получения месцев
   * @return months массив месяцев
   */
  public get getMonths(): Array<string> {
    return this.months.slice();
  }
}
