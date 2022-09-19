import { ProjectManager } from "./project-manager.model";

export interface StatsHistory {
  id: number;
  pm: ProjectManager;
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
  startDate: Date;
  endDate: Date;
}