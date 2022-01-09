import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { registerLocaleData } from '@angular/common';
import localeRu from '@angular/common/locales/ru';
import { AppComponent } from './app.component';
import { SliderComponent } from './components/slider/slider.component';
import { SliderLabelComponent } from './components/slider-label/slider-label.component';
import { DateService } from './services/dateService/date.service';
import { SankeyComponent } from './components/sankey/sankey.component';
import { HttpClientModule } from '@angular/common/http';
import { CategoriesComponent } from './components/categories/categories.component';
import { HighchartsChartModule } from 'highcharts-angular';
import { MatIconModule } from '@angular/material/icon';
registerLocaleData(localeRu, 'ru');

@NgModule({
  declarations: [
    AppComponent,
    SliderComponent,
    SliderLabelComponent,
    SankeyComponent,
    CategoriesComponent,
  ],
  imports: [BrowserModule, HttpClientModule, HighchartsChartModule, MatIconModule],
  providers: [{ provide: LOCALE_ID, useValue: 'ru' }, DateService],
  bootstrap: [AppComponent],
})
export class AppModule {}
