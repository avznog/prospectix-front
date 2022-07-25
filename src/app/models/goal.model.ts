import { ProjectManager } from "./project-manager.model";

export interface Goal {
    id: number;
    isCyclic: boolean;
    deadline: Date;
    title: string;
    totalSteps: number;
    currentStep: number;
    pm: ProjectManager;
    description: string;
}
