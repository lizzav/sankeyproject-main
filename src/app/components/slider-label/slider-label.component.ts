import { Component, OnInit, Input, OnChanges, ElementRef } from '@angular/core';
import { DateService } from '../../services/dateService/date.service';

/**
 * Компонент ярлыка точки слайдера
 */
@Component({
  selector: 'app-slider-label',
  templateUrl: './slider-label.component.html',
  styleUrls: ['./slider-label.component.scss'],
})
export class SliderLabelComponent implements OnInit, OnChanges {
  /**
   * Точка слайдера
   */
  @Input() public sliderPoint: any;

  /**
   *  Значение слайдера
   */
  @Input() public value: number | undefined;

  /**
   *  Массив месяцев
   */
  public months: Array<string>;

  /**
   * Ссылка на DOM-элемент подписи к слайдеру
   */
  private sliderElement: HTMLElement | undefined;

  /**
   * Дата положения слайдера
   */
  public valueDate: Date;

  /**
   * Половина длины ярлыка к слайдеру
   */
  public marginLeft: string;

  /**
   * Конструктор SliderLabelComponent
   * Иницилизация полей компонента
   * @param sliderValueRef сслыка на DOM-элемент ярлыка слайдера
   * @param dateService сервис с массивом месяцев
   */
  constructor(private sliderValueRef: ElementRef, private readonly dateService: DateService) {
    this.months = dateService.getMonths;
    this.valueDate = new Date();
    this.marginLeft = '';
  }

  /**
   * Инициализация компонента
   */
  public ngOnInit(): void {
    this.valueDate = new Date(this.sliderPoint?.value);
    this.sliderElement =
      this.sliderValueRef.nativeElement.getElementsByClassName('slider-label')[0];
    this.setLabelPosition();
  }

  /**
   * Переопределение значения valueDate и вызов setLabelPosition
   * при изменении значений свойства this.value
   */
  public ngOnChanges(): void {
    this.valueDate = new Date(this.sliderPoint?.value);
    this.setLabelPosition();
  }

  /**
   * Функция установки сдвига позиции надписи над слайдером
   */
  private setLabelPosition(): void {
    if (this.sliderElement) {
      const halfWidth = 38;
      const halfPointer = 10;
      const zeroPercent = 0;
      const hundredPercent = 100;
      const ninetyPercent = 90;
      const sixtyPercent = 60;
      const tenPercent = 10;
      const fortyPercent = 40;

      if (this.sliderPoint?.position === zeroPercent) {
        this.marginLeft = -halfWidth + halfPointer + 'px';
      } else if (this.sliderPoint?.position === hundredPercent) {
        this.marginLeft = -halfWidth - halfPointer + 'px';
      } else if (this.sliderPoint?.position > ninetyPercent) {
        this.marginLeft = -this.sliderElement.offsetWidth / 2 - halfPointer + 'px';
      } else if (this.sliderPoint?.position > sixtyPercent) {
        this.marginLeft = -this.sliderElement.offsetWidth / 2 - halfPointer / 2 + 'px';
      } else if (this.sliderPoint?.position < tenPercent) {
        this.marginLeft = -this.sliderElement.offsetWidth / 2 + halfPointer + 'px';
      } else if (this.sliderPoint?.position < fortyPercent) {
        this.marginLeft = -this.sliderElement.offsetWidth / 2 + halfPointer / 2 + 'px';
      } else {
        this.marginLeft = -this.sliderElement.offsetWidth / 2 + 'px';
      }
    }
  }
}
