export interface ResearchParamsReminder {
  take?: number;
  skip: number;
  priority: number | null;
  done: number;
  keyword: string | null;
}