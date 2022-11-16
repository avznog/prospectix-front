import { Email } from "./email.model";
import { ProjectManager } from "./project-manager.model";
import { Prospect } from "./prospect.model";

export interface SentEmail {
  id: number;
  pm: ProjectManager;
  prospect: Prospect;
  object: string;
  message: string;
  sendingDate: Date;
  date: Date;
  sent: boolean;
}