import { Bookmark } from "./bookmark.model";
import { Event } from "./event.model";
import { Goal } from "./goal.model";
import { Meeting } from "./meeting.model";
import { Reminder } from "./reminder.model";
import { SentEmail } from "./sent-email.model";

export interface ProjectManager {
  id: number;
  pseudo: string;
  admin: boolean;
  name: string;
  firstname: string;
  mail: string;
  tokenEmail: string;
  disabled: boolean;
  goals: Goal[];
  meetings: Meeting[];
  reminders: Reminder[];
  sentEmails: SentEmail[];
  bookmarks: Bookmark[];
  events: Event[];
}
