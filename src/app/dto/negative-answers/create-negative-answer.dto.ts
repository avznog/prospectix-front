import { ProjectManager } from "src/app/models/project-manager.model";
import { Prospect } from "src/app/models/prospect.model";

export interface CreateNegativeAnswerDto {
    pm?: ProjectManager;
    prospect: Prospect;
    date: Date;
}