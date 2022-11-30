export interface UpdateGoalTemplateDto {
  id?: number;
  name?: string;
  description?: string;
  disabled?: boolean;
  default?: number;
  important?: boolean;
}