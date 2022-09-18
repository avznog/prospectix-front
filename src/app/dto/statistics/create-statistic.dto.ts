import { ProjectManager } from "src/app/models/project-manager.model";

export interface CreateStatisticDto {
  totalCalls: number;
  totalReminders: number;
  totalMeetings: number;
  totalSentEmails: number;
  totalNegativeAnswers: number;
  weeklyCalls: number;
  weeklyReminders: number;
  weeklyMeetings: number;
  weeklySentEmails: number;
  weeklyNegativeAnswers: number;
  pm: ProjectManager;
  isReseted: boolean;
}