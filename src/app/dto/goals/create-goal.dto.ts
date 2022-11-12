import { GoalTemplate } from "src/app/models/goal-template.model";
import { ProjectManager } from "src/app/models/project-manager.model";

export interface CreateGoalDto {
  goalTemplate: GoalTemplate;
  disabled: boolean;
  value: number;
  important: boolean;
  pm: ProjectManager;
}