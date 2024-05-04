export interface ScheduleItem {
  urlPicture: string | null;
  day: {
    start: Date;
    end: Date;
  };
  name: string;
}