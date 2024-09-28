import { IPerson } from "./person.model";

export interface ITask {
    id: number;
    name: string;
    deadline: Date;
    isCompleted: boolean;
    people: IPerson[];
  }