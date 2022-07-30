import { Activity } from "src/app/models/activity.model";
import { Bookmark } from "src/app/models/bookmark.model";
import { City } from "src/app/models/city.model";
import { Country } from "src/app/models/country.model";
import { Email } from "src/app/models/email.model";
import { Event } from "src/app/models/event.model";
import { Meeting } from "src/app/models/meeting.model";
import { Phone } from "src/app/models/phone.model";
import { Reminder } from "src/app/models/reminder.model";
import { Website } from "src/app/models/website.model";

export interface UpdateProspectDto {
  companyName: string;
  activity: Activity;
  streetAddress: string;
  city: City;
  country: Country;
  phone: Phone;
  email: Email;
  website: Website;
  comment: string;
  nbNo: number;
  disabled: boolean;
  isBookmarked: boolean;
}