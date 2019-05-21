import { Component, OnInit } from '@angular/core';
import { Todo, TodoList } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todos',
  templateUrl: './todos.component.html',
  styleUrls: ['./todos.component.styl']
})
export class TodosComponent implements OnInit {
  todos: TodoList = {
    todo: [],
    done: []
  };

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos()
      .subscribe(todos => this.todos = todos);
  }

}
