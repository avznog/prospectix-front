export interface CreateGoalTemplateDto {
  name: string;
  description: string;
  disabled: boolean;
  default: number;
  important: boolean;
}