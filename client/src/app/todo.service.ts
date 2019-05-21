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
    done: []
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
    this.todos.done.push(doneTodo);
    this.todos.todo = this.todos.todo.filter(todo => todo.id !== doneTodo.id);

    return of(this.todos);
  }
}
