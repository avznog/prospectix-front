import { VersionProspectType, VersionCityType, VersionPrimaryActivityType, VersionSecondaryActivityType } from "src/app/constants/versions.type";

export interface CreateSearchParamsDto {
  versionProspect: VersionProspectType;
  versionCity: VersionCityType;
  versionPrimaryActivity: VersionPrimaryActivityType;
  versionSecondaryActivity: VersionSecondaryActivityType;
}