/**
 *  Функция для задания цвета компонентов
 *  @param H Highcharts
 */
export default function setColorNodes(H: any): void {
  H.seriesTypes.sankey.prototype.pointAttribs = function (point: any, state: any): object {
    this.nodes.forEach((el: any) => {
      switch (el.column) {
        case 0: {
          el.color = ['#008EF9', '#0167B3', '#0478E3'];
          break;
        }
        case 1: {
          el.color = ['#37C7E1', '#17B0CC', '#1EB4D0'];
          break;
        }
        case 2: {
          el.color = ['#853CE3', '#A15EF5', '#8243D2'];
          break;
        }
        case 3: {
          el.color = ['#FAA27B', '#E36933', '#EF8658'];
          break;
        }
        default: {
          break;
        }
      }
    });
    let opacity = 0.2;
    if (state) {
      opacity = this.options.states[state].linkOpacity === 1 ? 0.5 : opacity;
    }

    return {
      fill: point.isNode
        ? {
            linearGradient: {
              x1: 0,
              x2: 0,
              y1: 0,
              y2: 1,
            },
            stops: [
              [0, H.color(point.color[0]).setOpacity(1).get()],
              [1, H.color(point.color[1]).setOpacity(1).get()],
            ],
          }
        : {
            linearGradient: {
              x1: 0,
              x2: 1,
              y1: 0,
              y2: 0,
            },
            stops: [
              [
                0,
                H.color(this.nodes.filter((e: any) => e.id === point.from)[0].color[2])
                  .setOpacity(opacity)
                  .get(),
              ],
              [1, H.color(point.toNode.color[2]).setOpacity(opacity).get()],
            ],
          },
    };
  };
}
