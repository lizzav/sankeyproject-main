import { ComponentFixture, TestBed } from '@angular/core/testing';
import { SankeyComponent } from './sankey.component';

describe('SankeyComponent', () => {
  let component: SankeyComponent;
  let fixture: ComponentFixture<SankeyComponent>;

  const data = [
    { from: 1, to: 2, weight: 2, abs: 12 },
    { from: 2, to: 3, weight: 2, abs: 12 },
    { from: 3, to: 4, weight: 2, abs: 12 },
  ];

  const sections = [
    { id: 1, name: 'Секция 1' },
    { id: 2, name: 'Секция 2' },
    { id: 3, name: 'Секция 3' },
    { id: 4, name: 'Секция 4' },
  ];

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [SankeyComponent],
    }).compileComponents();
  });

  beforeEach(() => {
    fixture = TestBed.createComponent(SankeyComponent);
    component = fixture.componentInstance;
    component.data = data;
    component.sections = sections;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('проверка sankey option с непутыми данными', () => {
    component.ngOnChanges();
    expect(component.data).toEqual(data);
    expect(component.sections).toEqual(sections);
  });

  it('проверка sankey option с пустыми данными', () => {
    component.data = [];
    component.sections = [];
    expect(component.data).toEqual([]);
    expect(component.sections).toEqual([]);
    fixture.detectChanges();
    component.ngOnChanges();
  });
});
