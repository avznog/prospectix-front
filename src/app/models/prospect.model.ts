import { ReasonDisabledType } from "../constants/reasonDisabled.type";
import { StageType } from "../constants/stage.type";
import { SecondaryActivity } from "./secondary-activity.model";
import { Bookmark } from "./bookmark.model";
import { City } from "./city.model";
import { Country } from "./country.model";
import { Email } from "./email.model";
import { Event } from "./event.model";
import { Meeting } from "./meeting.model";
import { Phone } from "./phone.model";
import { Reminder } from "./reminder.model";
import { Website } from "./website.model";
import { VersionProspectType } from "../constants/versions.type";

export interface Prospect {
  id: number;
  companyName: string;
  streetAddress: string;
  comment: string;
  nbNo: number;
  disabled: boolean;
  secondaryActivity: SecondaryActivity;
  city: City;
  country: Country;
  phone: Phone;
  email: Email;
  website: Website;
  isBookmarked: boolean;
  meetings: Meeting[];
  reminders: Reminder[];
  bookmarks: Bookmark[];
  events: Event[];
  stage: StageType;
  archived: Date;
  reasonDisabled: ReasonDisabledType;
  version: VersionProspectType;
  dateScraped: Date;
}