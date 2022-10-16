import { ProjectManager } from "src/app/models/project-manager.model";
import { Prospect } from "src/app/models/prospect.model";

export interface UpdateReminderDto {
    description: string;
    date: Date;
    priority: number;
    done: boolean;
    prospect: Prospect;
    pm?: ProjectManager;
}