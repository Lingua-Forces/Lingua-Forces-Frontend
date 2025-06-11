import { Option } from './option';
import { EmbeddedQuestion } from './embedded-question';

export interface Question {
  id: string;
  prompt: string;
  type: string;
  skill: string;
  level: string;
  elo: number;
  options?: Option[];
  readingText?: string;
  questions?: EmbeddedQuestion[];
}
