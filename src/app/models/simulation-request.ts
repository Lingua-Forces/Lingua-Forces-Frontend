export interface SimulationRequest {
    userId: number;
    startDate: string; // ISO date string
    endDate: string; // ISO date string
    maxExercisesPerDay: number;
    minExercisesPerDay: number;
    includeReevaluation: boolean;
}