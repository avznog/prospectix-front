import { ProjectManager } from "./project-manager.model";
import { Prospect } from "./prospect.model";

export interface SentEmail {
  id: number;
  pm: ProjectManager;
  prospect: Prospect;
  object: string;
  templateName: string;
  sendingDate: Date;
  date: Date;
  sent: boolean;
}