import { Activity } from "src/app/models/activity.model";
import { City } from "src/app/models/city.model";
import { Country } from "src/app/models/country.model";
import { CreateActivityDto } from "../activities/create-activity.dto";
import { CreateCityDto } from "../cities/create-city.dto";
import { CreateCountryDto } from "../countries/create-country.dto";
import { CreateEmailDto } from "../emails/create-email.dto";
import { CreatePhoneDto } from "../phones/create-phone.dto";
import { CreateWebsiteDto } from "../websites/create-website.dto";

export interface CreateProspectDto {
  companyName: string;
  streetAddress: string;
  activity: CreateActivityDto;
  city: CreateCityDto;
  country: CreateCountryDto;
  phone: CreatePhoneDto;
  email: CreateEmailDto;
  website: CreateWebsiteDto;
  comment: string;
  nbNo: number;
  disabled: boolean;
  isBookmarked: boolean;
}