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
    done: [],
    tags: {}
  };

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos()
      .subscribe(todos => this.todos = todos);
  }

  markAsDone(todo: Todo) {
    this.todoService.moveToDone(todo)
      .subscribe((todos => this.todos = todos));
  }

  markAsTodo(todo: Todo) {
    this.todoService.moveToToDo(todo)
      .subscribe((todos => this.todos = todos));
  }

}
