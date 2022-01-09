/**
 *  Интерфейс Sankey
 */
export default interface Sankey {
  /**
   * Массив данных sankey
   */
  data: Array<{ from: number; to: number; weight: number; abs: number }>;

  /**
   * Массив данных секций
   */
  sections: Array<{ id: number; name: string }>;
}
