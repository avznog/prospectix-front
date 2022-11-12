import { GoalTemplate } from "./goal-template.model";
import { ProjectManager } from "./project-manager.model";

export interface Goal {
  id: number;
  disabled: boolean;
  value: number;
  important: boolean;
  pm: ProjectManager;
  goalTemplate: GoalTemplate;
}