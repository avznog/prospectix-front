import { VersionCityType } from "src/app/constants/versions.type";

export interface CreateCityDto {
    name: string;
    zipcode: number;
    version: VersionCityType;
    dateScraped: Date;
}