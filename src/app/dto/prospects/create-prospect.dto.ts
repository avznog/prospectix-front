import { StageType } from "src/app/constants/stage.type";
import { CreateSecondaryActivityDto } from "../secondary-activities/create-secondary-activity.dto";
import { CreateCityDto } from "../cities/create-city.dto";
import { CreateCountryDto } from "../countries/create-country.dto";
import { CreateEmailDto } from "../emails/create-email.dto";
import { CreatePhoneDto } from "../phones/create-phone.dto";
import { CreateWebsiteDto } from "../websites/create-website.dto";
import { VersionProspectType } from "src/app/constants/versions.type";

export interface CreateProspectDto {
  companyName: string;
  streetAddress: string;
  secondaryActivity: CreateSecondaryActivityDto;
  city: CreateCityDto;
  country: CreateCountryDto;
  phone: CreatePhoneDto;
  email: CreateEmailDto;
  website: CreateWebsiteDto;
  comment: string;
  nbNo: number;
  disabled: boolean;
  isBookmarked: boolean;
  stage: StageType;
  version: VersionProspectType;
  dateScraped: Date;
  archived?: Date;
}