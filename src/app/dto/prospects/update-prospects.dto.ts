import { SecondaryActivity } from "src/app/models/secondary-activity.model";
import { City } from "src/app/models/city.model";
import { Country } from "src/app/models/country.model";
import { Email } from "src/app/models/email.model";
import { Phone } from "src/app/models/phone.model";
import { Website } from "src/app/models/website.model";

export interface UpdateProspectDto {
  companyName?: string;
  secondaryActivity?: SecondaryActivity;
  streetAddress?: string;
  city?: City;
  country?: Country;
  phone?: Phone;
  email?: Email;
  website?: Website;
  comment?: string;
  nbNo?: number;
  disabled?: boolean;
  isBookmarked?: boolean;
  version?: string;
  dateScraped?: Date;
}