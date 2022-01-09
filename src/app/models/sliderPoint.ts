/**
 *  Класс содержащий поля точки слайдера
 */
export class SliderPoint {
  /**
   * Значение слайдера
   */
  public value: number;

  /**
   *  Ссылка на DOM элемент слайдер
   */
  public domElement: any;

  /**
   * Стиль слайдера
   */
  public isReverse: boolean;

  /**
   * Позиция слайдера
   */
  public position: number;

  /**
   * Создание объекта класса
   */
  constructor(value: number, ref: any, isReverse: boolean) {
    this.value = value;
    this.domElement = ref;
    this.isReverse = isReverse;
    this.position = this.value;
  }
}
