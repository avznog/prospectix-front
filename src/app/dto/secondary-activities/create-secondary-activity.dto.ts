import { PrimaryActivity } from "src/app/models/primary-activity.model";

export interface CreateSecondaryActivityDto {
	name: string;
	weight: number;
	primaryActivity: PrimaryActivity;
}