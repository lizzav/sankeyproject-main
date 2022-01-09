import { Component, OnInit, ElementRef } from '@angular/core';
import { SliderPoint } from '../../models/sliderPoint';
import { DateService } from '../../services/dateService/date.service';
import config from '../../../config';

/**
 * Используется для отображения компонента слайдера
 */
@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.scss'],
})
export class SliderComponent implements OnInit {
  /**
   *  Значение начала слайдера
   */
  public start: number;

  /**
   * Значение конца слайдера
   */
  public end: number;

  /**
   * Элемент первого слайдера
   */
  public sliderFirst: SliderPoint;

  /**
   * Элемент второго слайдера
   */
  public sliderSecond: SliderPoint;

  /**
   * Выбранный способ отображения подписей на шкале слайдера
   */
  public switchItem: number;

  /**
   * Массив месяцев
   */
  public months: Array<string>;

  /**
   * Массив четвертей
   */
  public quarters: Array<string>;

  /**
   * Массив годов начиная с даты начала до конечной даты
   */
  public years: Array<number>;

  /**
   * Скрытие части символов при отображении месяца
   */
  public isHiddenMonthsLater: boolean;

  /**
   * Последний год слайдера
   */
  public lastYear: number;

  /**
   * Скрытие месяцев
   */
  public isHiddenMonths: boolean;

  /**
   * Скрытие четвертей
   */
  public isHiddenQuarters: boolean;

  /**
   * Конструктор SliderComponent
   * Иницилизация полей компонента
   * @param sliderTrack ссылка на DOM-элемент слайдера
   * @param monthWith ссылка на DOM-элементы нижне подписи слайдера
   * @param dateService сервис с массивом месяцев
   */
  constructor(
    private sliderTrack: ElementRef,
    private monthWith: ElementRef,
    private readonly dateService: DateService,
  ) {
    const oneDay = 86400000;
    this.start = new Date(config.startDate, 0, 1).getTime();
    this.end = new Date(config.endDate, 11, 31).getTime() + oneDay;
    this.sliderFirst = new SliderPoint(this.start, null, false);
    this.sliderSecond = new SliderPoint(this.end, null, true);
    this.switchItem = 1;
    this.months = dateService.getMonths;
    this.quarters = ['II', 'III', 'IV'];
    this.years = this.getCountYears();
    this.isHiddenMonthsLater = false;
    this.lastYear = 0;
    this.isHiddenMonths = false;
    this.isHiddenQuarters = false;
  }

  /**
   * Инициализация компонента
   */
  public ngOnInit(): void {
    this.setSliderValue();
    this.getCountYears();
    this.fillColor();
  }

  /**
   *  Функция для изменении значения value для первого и второго слайдера
   * @param event событие
   * @param number номер слайдера для которого было вызвано событие
   */
  public changeSliderPosition(event: any, number: number): void {
    const value = Number(event.target.value);
    const isFirstSlider = number === 1;
    const maxValue = isFirstSlider ? this.sliderSecond.value : this.end;
    const minValue = isFirstSlider ? this.start : this.sliderFirst.value;
    const sliderValue = isFirstSlider ? this.sliderFirst : this.sliderSecond;
    if (value <= maxValue && value >= minValue) {
      sliderValue.value = value;
    } else {
      if (value > maxValue) {
        sliderValue.value = maxValue;
      } else {
        sliderValue.value = minValue;
      }
      sliderValue.domElement.value = sliderValue.value;
    }
    this.fillColor();
  }

  /**
   *  Функция получения позиции точки
   *  @param value значение слайдера
   *  @return number положение точки на оси х в %
   */
  private getPosition(value: number): number {
    return ((value - this.start) / (this.end - this.start)) * 100;
  }

  /**
   *  Функция изменения положения закрашенного интервала между слайдерами
   */
  private fillColor(): void {
    this.sliderFirst.position = this.getPosition(this.sliderFirst.value);
    this.sliderSecond.position = this.getPosition(this.sliderSecond.value);
  }

  /**
   * Функция для подсчета количества лет в заданном интервале и заполнения массива years годами
   * @return years массив с годами
   */
  private getCountYears(): Array<number> {
    const years: Array<number> = [];
    const startYear = new Date(this.start).getFullYear();
    const endYear = new Date(this.end).getFullYear();
    const count = endYear - startYear;
    this.lastYear = endYear;
    while (count !== years.length) {
      years.push(startYear + years.length);
    }
    return years;
  }

  /**
   *  Функция для установки минимального и максимального значения слайдеров
   */
  private setSliderValue(): void {
    const domElementsCollection =
      this.sliderTrack.nativeElement.getElementsByClassName('slider__item');
    this.sliderFirst.domElement = domElementsCollection[0];
    this.sliderSecond.domElement = domElementsCollection[1];
    this.sliderFirst.domElement.max = this.end;
    this.sliderFirst.domElement.min = this.start;
    this.sliderSecond.domElement.max = this.end;
    this.sliderSecond.domElement.min = this.start;
  }

  /**
   *  Функция изменения переменной switchItem и запуска функции onResize()
   */
  public setSwitch(number: number): void {
    this.switchItem = number;
    this.onResize();
  }

  /**
   *  Функция запускающая проверки ширины для элементов подписи слайдера
   *  при изменении ширины экрана или при смене переключателя switchItem
   */
  public onResize(): void {
    const minWidthForHiddenMonth = 235;
    const minWidthForMonth = 400;
    const minWidthForQuarter = 125;
    const yearsContainerLength =
      this.monthWith.nativeElement.getElementsByClassName('block-width')[0].offsetWidth;
    this.isHiddenQuarters = yearsContainerLength < this.getWidthBlock(minWidthForQuarter);
    this.isHiddenMonths = yearsContainerLength < this.getWidthBlock(minWidthForHiddenMonth);
    this.isHiddenMonthsLater = yearsContainerLength < this.getWidthBlock(minWidthForMonth);
  }

  /**
   *  Функция возвращающая ширину проверяемого контейнера
   *  @param width минимальная высота элемента
   *  @return number ширина контейнера
   */
  private getWidthBlock(width: number): number {
    const lengthYear = 40;
    return width * this.years.length + lengthYear * (this.years.length + 1);
  }
}
