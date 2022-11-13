import { GoalTemplate } from "./goal-template.model";
import { ProjectManager } from "./project-manager.model";

export interface Goal {
  id: number;
  disabled: boolean;
  value: number;
  pm: ProjectManager;
  goalTemplate: GoalTemplate;
}