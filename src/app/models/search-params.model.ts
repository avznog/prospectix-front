import { VersionCityType, VersionPrimaryActivityType, VersionProspectType, VersionSecondaryActivityType } from "../constants/versions.type";

export interface SearchParams {
  id: number;
  versionProspect: VersionProspectType;
  versionCity: VersionCityType;
  versionPrimaryActivity: VersionPrimaryActivityType;
  versionSecondaryActivity: VersionSecondaryActivityType;
}