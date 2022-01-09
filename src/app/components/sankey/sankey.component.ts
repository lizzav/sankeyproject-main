import { Component, Input, OnChanges } from '@angular/core';
import * as Highcharts from 'highcharts';
import HC_exporting from 'highcharts/modules/exporting';
import HC_more from 'highcharts/highcharts-more';
import HC_sankey from 'highcharts/modules/sankey';
import setColorNodes from './setColorNodes';
import { DefaultSeriesService } from '../../services/defaultSeriesService/default-series.service';
import Sankey from '../../models/sankey';

/**
 * Инициализация диаграммы
 */
HC_exporting(Highcharts);
HC_more(Highcharts);
HC_sankey(Highcharts);
setColorNodes(Highcharts);

/**
 * Компонент sankey
 */
@Component({
  selector: 'app-sankey',
  templateUrl: './sankey.component.html',
  styleUrls: [],
})
export class SankeyComponent implements OnChanges, Sankey {
  /**
   * Массив данных sankey
   */
  @Input() public data: Array<{ from: number; to: number; weight: number; abs: number }> = [];

  /**
   * Массив данных секций
   */
  @Input() public sections: Array<{ id: number; name: string }> = [];

  /**
   * Объект опций Sankey
   */
  private options: Highcharts.Options = {};

  /**
   * Конструктор SliderComponent
   * @param defaultSeries экземпляр класса DefaultSeriesService
   */
  public constructor(private readonly defaultSeries: DefaultSeriesService) {
    this.setOption();
  }

  /**
   * Метод инициализации опций
   */
  private setOption() {
    this.options = {
      chart: {
        marginLeft: 60,
        marginRight: 60,
        marginBottom: 20,
        height: 450,
        backgroundColor: 'transparent',
        events: {
          load() {
            this.showLoading();
            setTimeout(this.hideLoading.bind(this), 1000);
            this.reflow();
          },
        },
      },

      tooltip: {
        useHTML: true,
        headerFormat: undefined,
        backgroundColor: '#ffffff',
        borderWidth: 0,
        borderRadius: 20,
        padding: 0,
        shadow: false,

        positioner: function (boxWidth, boxHeight, point) {
          const margin = 60;
          if (this.chart.chartWidth + margin < point.plotX + margin * 2 + boxWidth / 2) {
            return { x: this.chart.chartWidth - boxWidth, y: point.plotY - boxHeight };
          } else if (point.plotX - boxWidth / 2 + margin < 0) {
            return { x: 0, y: point.plotY - boxHeight };
          }
          return { x: point.plotX - boxWidth / 2 + margin, y: point.plotY - boxHeight };
        },

        pointFormatter: function (this: any) {
          return `<div class="highcharts__tooltip ">
          ${this.fromNode.name} и ${this.toNode.name}
            <span class="highcharts__tooltip_color" style="color: ${this.fromNode.color[0]}">${
            Math.round(this.weight * 100) / 100
          }% </span>
          </div>`;
        },
      },

      plotOptions: {
        sankey: {
          animation: {
            duration: 1000,
            easing: 'easeOutBounce',
          },
          dataLabels: {
            enabled: true,
            useHTML: true,

            nodeFormatter: function (this: any) {
              const getDifferentStyle =
                this.point.column === 3 ? 'right: 0;margin-right: -10px;' : ' margin-left: -10px;';
              const style = `margin-top: ${this.point.shapeArgs.height / 2}px;`;
              return `<span class='highcharts__label' style='${getDifferentStyle + style}'>
              ${this.point.name}
              <span class='highcharts__label_color' style='color: ${this.point.color[0]};'>
              ${Math.round(this.point.sum * 10) / 10}%
              </span>
              </span>`;
            },
          },

          tooltip: {
            headerFormat: undefined,
            nodeFormatter: function (this: any) {
              return `<div class="highcharts__tooltip">
              ${this.name}
              <span class="highcharts__tooltip_color" style="color: ${this.color[0]}">
              ${Math.round(this.sum * 10) / 10}%
              </span>
              </div>`;
            },
          },
        },
      },
    };
  }

  /**
   * Обнавление данных Sankey
   */
  public ngOnChanges(): void {
    if (this.data.length && this.sections.length) {
      this.options.series = [
        {
          data: this.data.map((el: { from: number; to: number; weight: number; abs: number }) => {
            return {
              from: `${el.from}`,
              to: `${el.to}`,
              weight: el.weight,
            };
          }),
          type: 'sankey',

          nodes: this.sections.map((el: { id: number; name: string }) => {
            return {
              id: `${el.id}`,
              name: `${el.name}`,
            };
          }),
          minLinkWidth: 5,
          nodePadding: 30,
        },
      ];
    } else {
      this.options.series = this.defaultSeries.getSeries;
    }
    Highcharts.chart('sankey', this.options);
  }
}
