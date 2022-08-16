import { EventType } from "../constants/event.type";
import { ProjectManager } from "./project-manager.model";
import { Prospect } from "./prospect.model";

export interface Event {
  id: number;
  type: EventType;
  date: Date;
  pm: ProjectManager;
  prospect: Prospect;
  description: string;
}