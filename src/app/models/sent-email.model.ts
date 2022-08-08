import { Email } from "./email.model";
import { ProjectManager } from "./project-manager.model";

export interface SentEmail {
  id: number;
  pm: ProjectManager;
  email: Email;
  object: string;
  message: string;
  sendingDate: Date;
}