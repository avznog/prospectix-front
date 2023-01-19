import { ProjectManager } from "src/app/models/project-manager.model";
import { Prospect } from "src/app/models/prospect.model";

export interface CreateSentEmailDto {
  object: string;
  templateName: string;
  sendingDate?: Date;
  date: Date;
  prospect: Prospect;
  pm: ProjectManager;
  sent: boolean;
}