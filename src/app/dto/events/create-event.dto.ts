import { EventType } from "src/app/constants/event.type";
import { ProjectManager } from "src/app/models/project-manager.model";
import { Prospect } from "src/app/models/prospect.model";

export interface CreateEventDto {
  prospect: Prospect;
  description: string;
  date: Date;
  type: EventType;
  pm?: ProjectManager;
}