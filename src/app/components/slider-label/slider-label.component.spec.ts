import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SliderLabelComponent } from './slider-label.component';
import { CUSTOM_ELEMENTS_SCHEMA } from '@angular/core';
import { DateService } from '../../services/dateService/date.service';
import months from '../../consts/months.const';

describe('SliderLabelComponent', () => {
  let component: SliderLabelComponent;
  let fixture: ComponentFixture<SliderLabelComponent>;
  const fakeDateService = jasmine.createSpyObj('fakeDate', [], ['getMonths']);
  const halfWidth = 38;
  const halfPointer = 10;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SliderLabelComponent],
      providers: [{ provide: DateService, useValue: fakeDateService }],
      schemas: [CUSTOM_ELEMENTS_SCHEMA],
    }).compileComponents();
  });

  beforeEach(() => {
    // @ts-ignore
    Object.getOwnPropertyDescriptor(fakeDateService, 'getMonths').get.and.returnValue(months);
    fixture = TestBed.createComponent(SliderLabelComponent);
    component = fixture.componentInstance;
    component.sliderPoint = {
      isReverse: false,
      position: 0,
      value: 1388509200000,
    };
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('проверка месяцев', () => {
    expect(component.months).toEqual(months);
  });

  it('проверка смещения тултипа слайдера в 0%', () => {
    component.ngOnChanges();
    fixture.detectChanges();
    expect(`-${halfWidth - halfPointer}px`).toEqual(component.marginLeft);
  });

  it('проверка смещения тултипа слайдера в 100%', () => {
    component.sliderPoint.position = 100;
    component.ngOnChanges();
    fixture.detectChanges();
    expect(`-${halfWidth + halfPointer}px`).toEqual(component.marginLeft);
  });

  it('проверка смещения тултипа слайдера больше 90%, но меньше 100%', () => {
    component.sliderPoint.position = 95;
    component.ngOnChanges();
    fixture.detectChanges();
    const elementWidth =
      fixture.nativeElement.getElementsByClassName('slider-label')[0].offsetWidth;
    expect(`-${Math.round(elementWidth / 2) + halfPointer}px`).toEqual(component.marginLeft);
  });

  it('проверка смещения тултипа слайдера больше 60%, но меньше 90%', () => {
    component.sliderPoint.position = 70;
    component.ngOnChanges();
    fixture.detectChanges();
    const elementWidth =
      fixture.nativeElement.getElementsByClassName('slider-label')[0].offsetWidth;
    expect(`-${Math.round(elementWidth / 2) + halfPointer / 2}px`).toEqual(component.marginLeft);
  });

  it('проверка смещения тултипа слайдера больше 10%, но меньше 40%', () => {
    component.sliderPoint.position = 30;
    component.ngOnChanges();
    fixture.detectChanges();
    const elementWidth =
      fixture.nativeElement.getElementsByClassName('slider-label')[0].offsetWidth;
    expect(`-${Math.round(elementWidth / 2) - halfPointer / 2}px`).toEqual(component.marginLeft);
  });

  it('проверка смещения тултипа слайдера больше 0%, но меньше 10%', () => {
    component.sliderPoint.position = 5;
    component.ngOnChanges();
    fixture.detectChanges();
    const elementWidth =
      fixture.nativeElement.getElementsByClassName('slider-label')[0].offsetWidth;
    expect(`-${Math.round(elementWidth / 2) - halfPointer}px`).toEqual(component.marginLeft);
  });

  it('проверка смещения тултипа слайдера больше 40%, но меньше 60%', () => {
    component.sliderPoint.position = 50;
    component.ngOnChanges();
    fixture.detectChanges();
    const elementWidth =
      fixture.nativeElement.getElementsByClassName('slider-label')[0].offsetWidth;
    expect(`-${Math.round(elementWidth / 2)}px`).toEqual(component.marginLeft);
  });
});
