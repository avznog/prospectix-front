import { SecondaryActivity } from "src/app/models/secondary-activity.model";

export interface UpdatePrimaryActivityDto {
  name?: string;
  weight?: number;
  secondaryActivity?: SecondaryActivity;
  weightCount?: number;
}