import { SecondaryActivity } from "./secondary-activity.model";

export interface PrimaryActivity {
  id: number;
  name: string;
  weight: number;
  secondaryActivities: SecondaryActivity[];
  weightCount: number;
  version: string;
  dateScraped: Date;
}