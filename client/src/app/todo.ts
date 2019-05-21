export class Todo {
    id: number;
    content: string;
    tags: string[];
}

export class TodoList {
  todo: Todo[];
  done: Todo[];
}