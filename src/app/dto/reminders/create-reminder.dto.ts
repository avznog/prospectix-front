import { ProjectManager } from "src/app/models/project-manager.model";
import { Prospect } from "src/app/models/prospect.model";

export interface CreateReminderDto {
  description: string;
  date: Date;
  priority: number;
  done: boolean;
  pm: ProjectManager;
  prospect: Prospect;
}