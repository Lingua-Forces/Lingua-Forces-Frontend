import { Option } from './option';

export interface EmbeddedQuestion {
  id: string;
  prompt: string;
  skill: string;
  elo: number;
  options: Option[];
}
