import { ProjectManager } from "./project-manager.model";

export interface MailTemplate {
	id: number;
	name: string;
	content: string;
	pm: ProjectManager;
}