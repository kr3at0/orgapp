import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

import { Todo, TodoList } from './todo';
import { TODOS } from './mock-todos';

@Injectable({
  providedIn: 'root'
})

export class TodoService {

  constructor() { }

  todos: TodoList = {
    todo: {
      all: TODOS,
      filtered: TODOS
    },
    done: {
      all: [],
      filtered: []
    },
    tags: {
      'за в нас': {
        color: '#900048'
      },
      'работа': {
        color: '#240041'
      },
      'храна': {
        color: '#ff4057'
      },
      'котки': {
        color: '#5ca0d3'
      },
      'разходи': {
        color: '#15cda8'
      },
      'култура': {
        color: '#aa5c9f'
      }
    }
  };
  idWatcher: number = TODOS.length ? TODOS[TODOS.length - 1].id + 1 : 0;

  getTodos(): Observable<TodoList> {
    return of(this.todos);
  }

  // getTodo(id: number): Observable<TodoList> {
  //   return of(this.todos.todo.find(task => task.id === id));
  // }

  add(content: string): Observable<TodoList>  {
    this.idWatcher = ++this.idWatcher; 

    this.todos.todo.all.push({
      id: this.idWatcher,
      content,
      tags: []
    });

    this.todos.todo.filtered = this.todos.todo.all.slice();

    return of(this.todos);
  }

  remove(id: number): Observable<TodoList> {
    this.todos.todo.all = this.todos.todo.all.filter(todo => todo.id !== id);
    this.todos.todo.filtered = this.todos.todo.all.slice();

    return of(this.todos);
  }

  moveToDone(doneTodo: Todo): Observable<TodoList> {
    this.todos.done.all.unshift(doneTodo);
    this.todos.todo.all = this.todos.todo.all.filter(todo => todo.id !== doneTodo.id);
    this.todos.todo.filtered = this.todos.todo.all.slice();
    this.todos.done.filtered = this.todos.done.all.slice();

    return of(this.todos);
  }

  moveToToDo(todoTodo: Todo): Observable<TodoList> {
    this.todos.todo.all.push(todoTodo);
    this.todos.done.all = this.todos.done.all.filter(done => done.id !== todoTodo.id);
    this.todos.todo.filtered = this.todos.todo.all.slice();
    this.todos.done.filtered = this.todos.done.all.slice();

    return of(this.todos);
  }
}
