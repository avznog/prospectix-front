import { SecondaryActivity } from "src/app/models/secondary-activity.model";

export interface CreatePrimaryActivityDto {
  name: string;
  weight: number;
  secondaryActivity: SecondaryActivity;
  weightCount: number;
}