import { MeetingType } from "../constants/meeting.type";
import { ProjectManager } from "./project-manager.model";
import { Prospect } from "./prospect.model";

export interface Meeting {
  id: number;
  type: MeetingType.EXT;
  date: Date;
  done: boolean;
  pm: ProjectManager;
  prospect: Prospect;
}