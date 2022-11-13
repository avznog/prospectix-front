import { Goal } from "./goal.model";

export interface GoalTemplate {
  id: number;
  name: string;
  description: string;
  default: number;
  disabled: boolean;
  important: boolean;
  goals: Goal[];
}