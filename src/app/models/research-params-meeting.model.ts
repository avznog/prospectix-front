import { MeetingType } from "../constants/meeting.type";

export interface ResearchParamsMeeting {
    take?: number;
    skip: number;
    done: number;
    type: MeetingType | null;
    keyword: string | null;
}