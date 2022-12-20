import { ProjectManager } from "src/app/models/project-manager.model";

export interface CreateMailTemplateDto {
	name: string;
	content: string;
	pm: ProjectManager;
}