import { Component, OnInit } from '@angular/core';
import { HttpService } from '../../services/httpService/http.service';

/**
 * Компонент категорий с диаграммой
 */
@Component({
  selector: 'app-categories',
  templateUrl: './categories.component.html',
  styleUrls: ['./categories.component.scss'],
})
export class CategoriesComponent implements OnInit {
  /**
   * Массив данных sankey
   */
  private data: any;

  /**
   * Массив данных секций
   */
  public sections: Array<{ id: number; name: string }> = [];

  /**
   * Массив категорий
   */
  public categories: Array<number>;

  /**
   * Массив всех возможных путей
   */
  private ways: Array<number> = [12, 41, 31, 23, 24, 43, 21, 14, 13, 32, 42, 34];

  /**
   * Массив путей, используемых в категориях
   */
  private categoriesWays: Array<number> = [12, 23, 34];

  /**
   * Преобразованный массив данных
   */
  public dataWithFilter: any = [];

  /**
   * Конструктор SliderComponent
   * @param httpService экземпляр класса HttpClient
   */
  public constructor(private readonly httpService: HttpService) {
    this.categories = [1, 2, 3, 4];
  }

  /**
   * Иницилизация полей компонента
   */
  public ngOnInit(): void {
    this.httpService.getData().subscribe(([data, sections]: any) => {
      this.data = data;
      this.sections = sections;
      this.data.push(...this.data.map((el: any) => [el[1], el[0], el[2], el[3]]));
      this.dataFilter();
    });
  }

  /**
   * Перемещениие категории влево
   * @param index индекс позиции элемента
   * @param right смещение в право
   */
  public offsetCategories(index: number, right: boolean): void {
    if (!right) {
      index = index - 1;
    }
    this.categories.splice(index, 2, this.categories[index + 1], this.categories[index]);
    this.changeWay();
    this.dataFilter();
  }

  /**
   * Функция формирующая пути для выбранного порядка категорий
   */
  public changeWay(): void {
    this.categoriesWays = this.categories
      .slice(0, this.categories.length - 1)
      .map((el, index) => this.categories[index + 1] + el * 10);
  }

  /**
   * Функция фильтрации данных
   */
  private dataFilter(): void {
    this.dataWithFilter = [];
    this.categoriesWays.map((el: any) => {
      this.ways.map((element: any, index: number) => {
        if (element === el && this.data[index] && this.data[index][0]) {
          this.dataWithFilter.push(
            ...this.data[index][0].map((testElem: any, index2: number) => {
              return {
                from: testElem,
                to: this.data[index][1][index2],
                weight: this.data[index][2][index2],
                abs: this.data[index][3][index2],
              };
            }),
          );
        }
      });
    });
  }
}
