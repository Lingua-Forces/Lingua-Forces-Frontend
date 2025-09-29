import { Option } from './option';

export interface Question {
  id: string;
  prompt: string;
  type: string;
  skill: string;
  level: string;
  elo: number;
  options?: Option[];
  readingText?: string;
  rlModelLog?: RlModelLog;
}

export interface RlModelLog {
  modelType: string;
  modelName: string;
  modelVersion: string;
  eloUser: number;
  eloQuestionPrev: number;
  streak: number;
  resultPrev: number;
  offsetChosen: number;
  eloQuestionNext: number;
  timestamp: string; 
}


