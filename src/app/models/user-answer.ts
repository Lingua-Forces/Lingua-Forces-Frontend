import { RlModelLog } from "./question";

export interface UserAnswer {
  id: string;
  key: string;
  rlModelLog: RlModelLog;
}
