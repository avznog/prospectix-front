import { ProjectManager } from "./project-manager.model";
import { Prospect } from "./prospect.model";

export interface Reminder {
  id: number;
  description: string;
  priority: number;
  date: Date;
  pm: ProjectManager;
  prospect: Prospect;
  done: boolean;
  creationDate: Date;
}