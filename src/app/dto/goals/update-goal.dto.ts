import { GoalTemplate } from "src/app/models/goal-template.model";
import { ProjectManager } from "src/app/models/project-manager.model";

export interface UpdateGoalDto {
  id?: number;
  goalTemplate?: GoalTemplate;
  disabled?: boolean;
  value?: number;
  pm?: ProjectManager;
}