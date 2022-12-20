import { ProjectManager } from "src/app/models/project-manager.model";

export interface updateMailTemplateDto {
	name?: string;
	content?: string;
	pm?: ProjectManager;
}