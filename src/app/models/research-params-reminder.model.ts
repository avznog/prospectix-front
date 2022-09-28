export interface ResearchParamsReminder {
    take?: number;
    skip: number;
    priority: number;
    orderByPriority?: string;
    done: string | boolean;
    date?: string;
    oldOrNew: string;
    keyword: string;
}