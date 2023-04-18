import { VersionSecondaryActivityType } from "../constants/versions.type";
import { PrimaryActivity } from "./primary-activity.model";

export interface SecondaryActivity {
  id: number;
  name: string;
  weight: number;
  primaryActivity: PrimaryActivity;
  version: VersionSecondaryActivityType;
  weightCount: number;
  dateScraped: Date;
}