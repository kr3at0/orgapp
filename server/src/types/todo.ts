import { Tag } from './tag';

export enum TodoStatus {
    New = 0,
    InProgress = 1,
    Done = 2
}

export enum TodoPriority {
    ASAP = 0,
    Urgent = 1,
    Normal = 2,
    CanWait = 3,
    IfThersTime = 4,
    ProbablyNever = 5
}

export type Todo = {
    id: number;
    status: TodoStatus;
    priority: TodoPriority;
    tags: Tag[];
    dueDate: Date;
    doneAt: Date;
    createdAt: Date;
    updatedAt: Date;
}
