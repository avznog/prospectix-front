import { VersionProspectType, VersionCityType, VersionPrimaryActivityType, VersionSecondaryActivityType } from "src/app/constants/versions.type";

export interface UpdateSearchParamsDto {
  versionProspect?: VersionProspectType;
  versionCity?: VersionCityType;
  versionPrimaryActivity?: VersionPrimaryActivityType;
  versionSecondaryActivity?: VersionSecondaryActivityType;
}