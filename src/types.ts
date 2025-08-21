export type Todo = {
  title: string;
  detail: string;
  done: boolean;
  isBeingEdited: boolean;
  id: TodoId;
};

export type TodoId = number;
