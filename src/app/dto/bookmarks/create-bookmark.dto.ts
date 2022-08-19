import { ProjectManager } from "src/app/models/project-manager.model";
import { Prospect } from "src/app/models/prospect.model";

export interface CreateBookmarkDto {
  pm?: ProjectManager;
  prospect: Prospect;
  creationDate: Date;
}
