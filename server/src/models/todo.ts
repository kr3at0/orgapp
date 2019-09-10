import { BaseModel } from './base-model';
import { Todo as Members } from '../types/todo';

export interface Todo extends Members {}

export class Todo extends BaseModel {
    static tableName = 'todo';

    static relationMappings = {};
}   