import { VersionCityType } from "../constants/versions.type";

export interface City {
  id: number; 
  name: string;
  zipcode: number;
  version: VersionCityType;
  dateScraped: Date;
}