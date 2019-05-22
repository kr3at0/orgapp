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
    todo: TODOS,
    done: [],
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

    this.todos.todo.push({
      id: this.idWatcher,
      content,
      tags: []
    });

    return of(this.todos);
  }

  remove(id: number): Observable<TodoList> {
    this.todos.todo = this.todos.todo.filter(todo => todo.id !== id);

    return of(this.todos);
  }

  moveToDone(doneTodo: Todo): Observable<TodoList> {
    this.todos.done.unshift(doneTodo);
    this.todos.todo = this.todos.todo.filter(todo => todo.id !== doneTodo.id);

    return of(this.todos);
  }

  moveToToDo(todoTodo: Todo): Observable<TodoList> {
    this.todos.todo.push(todoTodo);
    this.todos.done = this.todos.done.filter(done => done.id !== todoTodo.id);

    return of(this.todos);
  }
}
