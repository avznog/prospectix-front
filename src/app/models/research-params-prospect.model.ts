export interface ResearchParamsProspect {
  keyword: string | null;
  take?: number;
  skip: number;
  cityName: string | null;
  secondaryActivity: string | null;
  primaryActivity: string | null;
}