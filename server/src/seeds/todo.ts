import * as Knex from "knex";
import { TodoPriority, TodoStatus } from "../types/todo";

export async function seed(knex: Knex): Promise<any> {
    return knex('todo').del()
        .then(() => {
            return knex('todo').insert([
                { description: 'first todo with normal priority'},
                { description: 'first todo with asap priority', priority: TodoPriority.ASAP },
                { description: 'first todo with completed status', status: TodoStatus.Done },
                { description: 'first todo with in progress status and urgent', status: TodoStatus.InProgress, priority: TodoPriority.Urgent },
                { description: 'first todo that probably won\'t be done ever', priority: TodoPriority.ProbablyNever }
            ]);
        });
};