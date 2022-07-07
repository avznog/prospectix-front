import { MeetingType } from "../constants/meeting.type";

export interface Meeting {
  id: number;
  type: MeetingType.EXT;
  date: Date;

}