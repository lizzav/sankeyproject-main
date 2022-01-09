import { ComponentFixture, TestBed } from '@angular/core/testing';
import { CategoriesComponent } from './categories.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { HttpService } from '../../services/httpService/http.service';
import { forkJoin, of } from 'rxjs';

describe('CategoriesComponent', () => {
  let component: CategoriesComponent;
  let fixture: ComponentFixture<CategoriesComponent>;
  const fakeHttpService = jasmine.createSpyObj('fakeDate', ['getData'], []);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [CategoriesComponent],

      providers: [{ provide: HttpService, useValue: fakeHttpService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    const data = [
      [
        [0, 1],
        [2, 3],
        [2, 2],
        [3, 3],
      ],
      [
        [2, 3],
        [4, 5],
        [2, 2],
        [3, 3],
      ],
    ];

    const sections = [
      { id: 1, name: 'Секция 1' },
      { id: 2, name: 'Секция 2' },
      { id: 3, name: 'Секция 3' },
      { id: 4, name: 'Секция 4' },
    ];

    fakeHttpService.getData.and.returnValue(forkJoin(of(data), of(sections)));
    fixture = TestBed.createComponent(CategoriesComponent);
    component = fixture.componentInstance;
    component.categories = [1, 2, 3, 4];
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('Проверка смещения категорий влево', () => {
    component.offsetCategories(2, false);
    expect(component.categories).toEqual([1, 3, 2, 4]);
  });

  it('Проверка смещения категорий вправо', () => {
    component.offsetCategories(2, true);
    expect(component.categories).toEqual([1, 2, 4, 3]);
  });

  it('Проверка dataFilter', () => {
    component.ngOnInit();
    fixture.detectChanges();
    expect(component.dataWithFilter).toEqual([
      { from: 0, to: 2, weight: 2, abs: 3 },
      { from: 1, to: 3, weight: 2, abs: 3 },
      { from: 4, to: 2, weight: 2, abs: 3 },
      { from: 5, to: 3, weight: 2, abs: 3 },
    ]);
  });

  it('Проверка changeWay', () => {
    component.categories = [1, 3, 4, 5];
    fixture.detectChanges();
    component.changeWay();
    //@ts-ignore
    expect(component.categoriesWays).toEqual([13, 34, 45]);
  });
});
