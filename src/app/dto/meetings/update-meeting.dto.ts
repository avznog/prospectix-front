import { ProjectManager } from "src/app/models/project-manager.model";
import { Prospect } from "src/app/models/prospect.model";

export interface UpdateMeetingDto {
  date?: Date;
  done?: boolean;
  prospect?: Prospect;
  pm?: ProjectManager;
  creationDate?: Date;
}