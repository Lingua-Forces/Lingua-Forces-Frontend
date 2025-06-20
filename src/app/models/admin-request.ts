export interface AdminRequest {
    userId: string;
    modelType: string; // 'nlp' | 'rl'
    startDate: string; // ISO date string
    endDate: string; // ISO date string
}