import { Activity } from "src/app/models/activity.model";
import { City } from "src/app/models/city.model";
import { Country } from "src/app/models/country.model";
import { CreateEmailDto } from "../emails/create-email.dto";
import { CreatePhoneDto } from "../phones/create-phone.dto";
import { CreateWebsiteDto } from "../websites/create-website.dto";

export interface CreateProspectDto {
  companyName: string;
  streetAddress: string;
  activity: Activity;
  city: City;
  country: Country;
  phone: CreatePhoneDto;
  email: CreateEmailDto;
  website: CreateWebsiteDto;
  comment: string;
  nbNo: number;
  disabled: boolean;
  isBookmarked: boolean;
}