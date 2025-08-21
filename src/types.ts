export type Todo = {
  title: string;
  detail: string;
  done: boolean;
  isBeingEdited: boolean;
  editedItems: {
    title: string;
    detail: string;
  };
  id: TodoId;
};

export type TodoId = number;
