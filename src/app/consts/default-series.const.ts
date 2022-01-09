/**
 * Начальное значения sankey
 */
const defaultSeries: any = [
  {
    data: [
      { from: '1', to: '2', weight: 100 },
      { from: '2', to: '3', weight: 100 },
      { from: '3', to: '4', weight: 100 },
    ],
    type: 'sankey',
    nodes: [
      {
        id: '1',
        name: 'н/д',
      },
      {
        id: '2',
        name: 'н/д',
      },
      {
        id: '3',
        name: 'н/д',
      },
      {
        id: '4',
        name: 'н/д',
      },
    ],
  },
];
export default defaultSeries;
