import { PrimaryActivity } from "../../models/primary-activity.model";

export interface UpdateSecondaryActivityDto {
  name?: string;
  weight?: number;
  primaryActivity?: PrimaryActivity;
  dateScraped?: Date;
}