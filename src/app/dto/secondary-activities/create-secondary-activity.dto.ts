import { PrimaryActivity } from "src/app/models/primary-activity.model";

export interface CreateSecondaryActivityDto {
	name: string;
	weight: number;
	primaryActivity: PrimaryActivity;
	version: string;
	weightCount: number;
	dateScraped: Date;
}