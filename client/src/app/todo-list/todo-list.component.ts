import { Component, OnInit, HostListener } from '@angular/core';
import { Todo, TodoList } from '../todo';
import { TodoService } from '../todo.service';

@Component({
  selector: 'app-todo-list',
  templateUrl: './todo-list.component.html',
  styleUrls: ['./todo-list.component.styl']
})

export class TodoListComponent implements OnInit {
  todos: TodoList = {
    todo: {
      all: [],
      filtered: []
    },
    done: {
      all: [],
      filtered: []
    },
    tags: {}
  };
  showList: boolean = false;
  newTodo: string = '';

  constructor(private todoService: TodoService) { }

  @HostListener('document:keydown.escape', ['$event']) onKeydownHandler(event: KeyboardEvent) {
    if (this.showList) this.toggleTodo();
  }

  ngOnInit() {
    this.getTodos();
  }

  toggleTodo(): void {
    this.showList = !this.showList;
  }

  addTodo(): void {
    this.todoService.add(this.newTodo)
      .subscribe(todos => {
        this.todos = { ...todos };
        this.newTodo = '';
      });
  }

  getTodos(): void {
    this.todoService.getTodos()
      .subscribe((todos) => this.todos = { ...todos });
  }

  removeTodo(id: number): void {
    this.todoService.remove(id)
      .subscribe(todos => this.todos = { ...todos } );
  }

  markAsDone(todo: Todo) {
    this.todoService.moveToDone(todo)
      .subscribe((todos => this.todos = { ...todos }));
  }
}
