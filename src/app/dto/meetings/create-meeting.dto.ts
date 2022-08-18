import { MeetingType } from "src/app/constants/meeting.type";
import { ProjectManager } from "src/app/models/project-manager.model";
import { Prospect } from "src/app/models/prospect.model";

export interface CreateMeetingDto {
  type: MeetingType;
  date: Date;
  done: boolean;
  prospect: Prospect;
  pm?: ProjectManager;
}