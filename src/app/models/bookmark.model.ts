import { ProjectManager } from "./project-manager.model";
import { Prospect } from "./prospect.model";

export interface Bookmark {
  id: number;
  creationDate: Date;
  pm: ProjectManager;
}