import { Option } from './option';

export interface EmbeddedQuestion {
  questionId: string;
  prompt: string;
  skill: string;
  elo: number;
  options: Option[];
}
