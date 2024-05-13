export interface TimeTablesItem {
  id:string|number;
  urlPicture?: string | null;
  day: KeysDayName;
  /**
   * En ms
   */
  startTime: number;

  /**
   * En ms
   */
  endTime: number;

  onDelete?: () => void;
}

export type KeysDayName = 1 | 2 | 3 | 4 | 5 | 6 | 7;

export type DayName = {
  [key in KeysDayName]: string;
};
