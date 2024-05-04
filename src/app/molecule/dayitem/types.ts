export interface DayItem {
  urlPicture: string | null;
  day: {
    start: Date;
    end: Date;
  };
  name: string;
}