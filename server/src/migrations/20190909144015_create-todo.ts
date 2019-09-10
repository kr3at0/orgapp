import * as Knex from 'knex';
import { TodoStatus, TodoPriority } from '../types/todo';

exports.up = async (knex: Knex) => {
    await knex.schema
        .createTable('todo', table => {
            table.increments('id').primary();
            table.string('description').notNullable();
            table.integer('status').notNullable().defaultTo(TodoStatus.New);
            table.integer('priority').notNullable().defaultTo(TodoPriority.Normal);
            table.specificType('tags', 'INT[]').notNullable().defaultTo('{}');
            table.jsonb('params').notNullable().defaultTo('{}');
            table.dateTime('due_date').defaultTo(knex.fn.now());
            table.timestamp('createdAt').defaultTo(knex.fn.now());
            table.timestamp('updatedAt').defaultTo(knex.fn.now());
        });
};

exports.down = async (knex: Knex) => {
    await knex.schema.dropTableIfExists('todo');
};
