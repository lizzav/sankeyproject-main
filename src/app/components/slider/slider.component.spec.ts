import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SliderComponent } from './slider.component';
import { DateService } from '../../services/dateService/date.service';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import months from '../../consts/months.const';

describe('SliderComponent', () => {
  let component: SliderComponent;
  let fixture: ComponentFixture<SliderComponent>;
  const fakeDateService = jasmine.createSpyObj('fakeDate', [], ['getMonths']);

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SliderComponent],
      providers: [{ provide: DateService, useValue: fakeDateService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    // @ts-ignore
    Object.getOwnPropertyDescriptor(fakeDateService, 'getMonths').get.and.returnValue(months);
    fixture = TestBed.createComponent(SliderComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('проверка массива месяцев', () => {
    expect(component.months).toEqual(months);
  });

  it('setSliderValue проверка начальных значений', () => {
    component.ngOnInit();
    const elements = fixture.nativeElement.getElementsByClassName('slider__item');
    expect(component.sliderFirst.value).toBe(component.start);
    expect(component.sliderSecond.value).toBe(component.end);
    expect(component.sliderFirst.domElement).toEqual(elements[0]);
    expect(component.sliderSecond.domElement).toEqual(elements[1]);
    expect(component.sliderFirst.position).toBe(
      ((component.sliderFirst.value - component.start) / (component.end - component.start)) * 100,
    );
    expect(component.sliderSecond.position).toBe(
      ((component.sliderSecond.value - component.start) / (component.end - component.start)) * 100,
    );
  });

  it('changeSliderPosition, проверка установки значений', () => {
    const eventFirst = { target: { value: new Date(2015, 0, 1).getTime() } };
    const eventSecond = { target: { value: new Date(2015, 4, 1).getTime() } };

    component.changeSliderPosition(eventFirst, 1);
    fixture.detectChanges();
    expect(component.sliderFirst.value).toBe(eventFirst.target.value);
    expect(Number(component.sliderFirst.domElement.value)).toBe(eventFirst.target.value);

    component.changeSliderPosition(eventSecond, 2);
    fixture.detectChanges();
    expect(component.sliderSecond.value).toBe(eventSecond.target.value);
  });

  it('changeSliderPosition, проверка выода слайдеров за пределы друг друга', () => {
    const eventFirst = { target: { value: new Date(2015, 0, 1).getTime() } };
    const eventSecond = { target: { value: new Date(2015, 4, 1).getTime() } };
    const eventThird = { target: { value: new Date(2014, 11, 1).getTime() } };

    component.changeSliderPosition(eventFirst, 1);
    component.changeSliderPosition(eventThird, 2);
    fixture.detectChanges();
    expect(component.sliderSecond.value).toBe(component.sliderFirst.value);
    expect(Number(component.sliderSecond.domElement.value)).toBe(component.sliderFirst.value);

    component.changeSliderPosition(eventSecond, 1);
    fixture.detectChanges();
    expect(component.sliderFirst.value).toBe(component.sliderSecond.value);
    expect(Number(component.sliderFirst.domElement.value)).toBe(component.sliderSecond.value);
  });

  it('проверка установки switchItem', () => {
    component.setSwitch(3);
    expect(component.switchItem).toBe(3);
  });

  it('проверка значений подписи слайдера, функция onResize', () => {
    component.onResize();
    fixture.detectChanges();

    const withYear = 40;
    const withYears = withYear * (component.years.length + 1);
    const minWidthForHiddenMonth = 235;
    const minWidthForMonth = 400;
    const minWidthForQuarter = 125;
    const containerWidthQuarters = minWidthForQuarter * component.years.length + withYears;
    const containerWidthMonth = minWidthForMonth * component.years.length + withYears;
    const containerWidthHiddenMonth = minWidthForHiddenMonth * component.years.length + withYears;
    const elementWidth = fixture.nativeElement.getElementsByClassName('block-width')[0].offsetWidth;

    expect(component.isHiddenMonths).toEqual(containerWidthHiddenMonth > elementWidth);
    expect(component.isHiddenQuarters).toEqual(containerWidthQuarters > elementWidth);
    expect(component.isHiddenMonthsLater).toEqual(containerWidthMonth > elementWidth);
  });
});
