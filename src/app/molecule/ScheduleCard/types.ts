export interface TimeTablesItem {
  id:string|number;
  day: KeysDayName;
  /**
   * En ms
   */
  startTime: number;

  /**
   * En ms
   */
  endTime: number;

  /**
   * Callback executed when the user confirms the delete of an item
   * @returns {void}
   */
  onDeleted?:()=>void;
}

export type KeysDayName = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type DayName = {
  [key in KeysDayName]: string;
};
