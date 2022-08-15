import { EventType } from "src/app/constants/event.type";
import { ProjectManager } from "src/app/models/project-manager.model";
import { Prospect } from "src/app/models/prospect.model";

export interface CreateEventDto {
  pm: ProjectManager;
  prospect: Prospect;
  description: string;
  date: Date;
  type: EventType;
}