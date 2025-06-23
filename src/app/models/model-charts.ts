  export interface AdminDashboardResponseDTO {
    kpiTotalExecutions: KpiCardDto;
    kpiDailyAverage: KpiCardDto;
    kpiAvgInferenceTime: KpiCardDto;
    executionsOverTime: ChartData1[]; 
    scoreDistributionByCriterion?: ChartData1[]; 
    avgScoreByCriterion?: ChartData1[]; 
    eloProgressOverTime?: ChartData1[];
    successRateByEloDiff?: ChartData1[];  
    lastExecutions: ModelExecutionLog[];
  
}

export interface ProgressDashboardResponseDTO {
    kpiUserLevel: KpiCardDto;
    kpiUserElo: KpiCardDto;
    kpiUserMaxStreak: KpiCardDto;
    kpiUserCurrentStreak: KpiCardDto;
    responseHistory: UserResponseDTO[];
    correctAnswersProportion: ChartSeries[]; 
    scoreComparison: ChartData1[]; 
    eloProgressOverTime: ChartData1[];
    activityCalendar: ChartSeries[];
}


export interface KpiCardDto {
  label: string;
  value: string;
} 

export interface ChartSeries {
  name: string;  
  value: number;  
}

export interface ChartData1 {
  name: string;
  series: ChartSeries[];
}


  

export interface ModelExecutionLog {
  timestamp: string; // ISO o fecha formateada
  userId: string;
  modelType: string;
  modelName: string;
  modelVersion: string;
  // solo para NLP
  inputText?: string;   
  predictedScores?: number[]; 
  // solo para RL
  eloUser?: number;    
  eloQuestionPrev?: number; 
  streak?: number; 
  resultPrev?: number;  
  eloQuestionNext?: number; 
  inferenceTimeMs: number;
}


export interface UserResponseDTO {
  answeredAt: string; 
  questionId: string;
  prompt: string;
  skill: string;
  questionType: string;
  questionElo: string;
  userAnswer: string;
  correct: string;
}