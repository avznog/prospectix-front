import { VersionPrimaryActivityType } from "src/app/constants/versions.type";
import { SecondaryActivity } from "src/app/models/secondary-activity.model";

export interface UpdatePrimaryActivityDto {
  name?: string;
  weight?: number;
  secondaryActivity?: SecondaryActivity;
  weightCount?: number;
  version?: VersionPrimaryActivityType;
  dateScraped?: Date;
}