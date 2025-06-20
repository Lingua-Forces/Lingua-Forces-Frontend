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
}
