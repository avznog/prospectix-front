import { Activity } from "./activity.model";
import { Bookmark } from "./bookmark.model";
import { City } from "./city.model";
import { Country } from "./country.model";
import { Email } from "./email.model";
import { Meeting } from "./meeting.model";
import { Phone } from "./phone.model";
import { Reminder } from "./reminder.model";
import { Website } from "./website.model";
import { Event } from "./event.model";

export interface Prospect {
    id: number;
    companyName: string;
    streetAddress: string;
    comment: string;
    nbNo: number;
    disabled: boolean;
    activity: Activity;
    city: City;
    country: Country;
    phone: Phone;
    email: Email;
    website: Website;
    meetings: Meeting[];
    reminders: Reminder[];
    bookmarks: Bookmark[];
    events: Event[];


}