export interface ResearchParamsProspect {
  keyword: string | null;
  take?: number;
  skip: number;
  city: number | null;
  secondaryActivity: number | null;
  primaryActivity: number | null;
}