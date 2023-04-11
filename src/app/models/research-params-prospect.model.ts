export interface ResearchParamsProspect {
  keyword: string | null;
  take?: number;
  skip: number;
  zipcode: number | null;
  secondaryActivity: string | null;
  primaryActivity: string | null;
}