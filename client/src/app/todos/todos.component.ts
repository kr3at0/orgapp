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
  appliedFilters: string[] = [];
  searchTerm: string = '';

  constructor(private todoService: TodoService) { }

  ngOnInit() {
    this.getTodos();
  }

  getTodos(): void {
    this.todoService.getTodos()
      .subscribe(todos => {
        this.todos = { ...todos }
        if (this.appliedFilters.length) this.applyFilters();
        if (this.searchTerm) this.searchTodos();
      });
  }

  markAsDone(todo: Todo) {
    this.todoService.moveToDone(todo)
      .subscribe(todos => {
        this.todos = { ...todos }
        if (this.appliedFilters.length) this.applyFilters();
        if (this.searchTerm) this.searchTodos();
      });
  }

  markAsTodo(todo: Todo) {
    this.todoService.moveToToDo(todo)
      .subscribe(todos => {
        this.todos = { ...todos }
        if (this.appliedFilters.length) this.applyFilters();
        if (this.searchTerm) this.searchTodos();
      });
  }

  applyFilters(): void {
    this.todos.todo = this.todos.todo.filter(todo => this.appliedFilters.every(t => todo.tags.includes(t)));
    this.todos.done = this.todos.done.filter(todo => this.appliedFilters.every(t => todo.tags.includes(t)));
  } 

  filterTodos(tag: string): void {
    if(this.appliedFilters.includes(tag)) {
      this.appliedFilters[this.appliedFilters.indexOf(tag)] = this.appliedFilters[this.appliedFilters.length - 1];
      this.appliedFilters.pop();
      this.getTodos();
    } else {
      this.appliedFilters.push(tag);
    }
    console.log(this.appliedFilters);
    this.applyFilters();
  }

  showAllTodos(): void {
    this.appliedFilters = [];
    this.getTodos();
  }

  searchTodos(): void {
    console.log(this.searchTerm);
    this.todos.todo = this.todos.todo.filter(todo => todo.content.indexOf(this.searchTerm) >= 0);
    this.todos.done = this.todos.done.filter(todo => todo.content.indexOf(this.searchTerm) >= 0);
  }
}
