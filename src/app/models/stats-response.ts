export interface StatsResponse {
  cefrLevel: string;
  currentElo: number;
  totalExercisesCompleted: number;
  correctAnswers: number;
  incorrectAnswers: number;
  currentStreak: number;
  averageTimePerQuestion: number;
}
