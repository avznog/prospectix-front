export interface CreateGoalDto {
    isCyclic: boolean;
    deadline: Date;
    title: string;
    totalSteps: number;
    currentStep: number;
    description: string;
}