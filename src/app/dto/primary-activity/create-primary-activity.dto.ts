import { VersionPrimaryActivityType } from "src/app/constants/versions.type";
import { SecondaryActivity } from "src/app/models/secondary-activity.model";

export interface CreatePrimaryActivityDto {
  name: string;
  weight: number;
  secondaryActivity: SecondaryActivity;
  weightCount: number;
  version: VersionPrimaryActivityType;
  dateScraped: Date;
}