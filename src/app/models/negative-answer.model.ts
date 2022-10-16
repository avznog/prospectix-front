import { ProjectManager } from "./project-manager.model";
import { Prospect } from "./prospect.model";

export interface NegativeAnswer {
  id: number;
  date: Date;
  pm: ProjectManager;
  prospect: Prospect;
}