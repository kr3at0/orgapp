export class Todo {
    id: number;
    content: string;
    tags: string[];
}

export class TodoList {
  todo: {
    all: Todo[];
    filtered: Todo[];
  }
  done: {
    all: Todo[];
    filtered: Todo[];
  }
  tags: {};
}