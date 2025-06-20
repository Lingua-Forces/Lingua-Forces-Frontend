  export interface AdminDashboardResponseDTO {
    kpiTotalExecutions: KpiCardDto;
    kpiDailyAverage: KpiCardDto;
    kpiAvgInferenceTime: KpiCardDto;
    executionsOverTime: LineChartData[]; 
    scoreDistributionByCriterion?: GroupedBarChartData[]; 
    avgScoreByCriterion?: GroupedBarChartData[]; 
    eloProgressOverTime?: LineChartData[];
    successRateByEloDiff?: LineChartData[];  
    lastExecutions: ModelExecutionLog[];
  
}

export interface KpiCardDto {
  label: string;
  value: string;
} 

export interface ChartSeries {
  name: string;  
  value: number;  
}

export interface LineChartData {
  name: string;
  series: ChartSeries[];
}


export interface GroupedBarChartData {
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