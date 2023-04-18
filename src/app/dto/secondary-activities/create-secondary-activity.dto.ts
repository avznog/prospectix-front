import { VersionSecondaryActivityType } from "src/app/constants/versions.type";
import { PrimaryActivity } from "src/app/models/primary-activity.model";

export interface CreateSecondaryActivityDto {
	name: string;
	weight: number;
	primaryActivity: PrimaryActivity;
	version: VersionSecondaryActivityType;
	weightCount: number;
	dateScraped: Date;
}