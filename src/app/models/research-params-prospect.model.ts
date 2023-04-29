export interface ResearchParamsProspect {
  keyword: string | null;
  take?: number;
  skip: number;
  city: string | null;
  zipcode: number | null;
  secondaryActivity: number | null;
  primaryActivity: number | null;
}