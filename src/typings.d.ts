export type Todo = {
  _id: string;
  text: string;
  date: Date;
  completed: boolean;
  subtasks: Subtask[];
};

export type Subtask = {
  _id: string;
  text: string;
  completed: boolean;
};

export type User = {
    email: string;
    password: string;
    token?: string;
};
