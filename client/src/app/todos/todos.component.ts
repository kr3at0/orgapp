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
  appliedFilters: string[] = [];
  searchTerm: string = '';
  objectKeys = Object.keys;

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
    this.todos.todo.filtered = this.todos.todo.all.filter(todo => this.appliedFilters.every(t => todo.tags.includes(t)));
    this.todos.done.filtered = this.todos.done.all.filter(todo => this.appliedFilters.every(t => todo.tags.includes(t)));
    this.todos.todo.filtered = this.todos.todo.filtered.filter(todo => todo.content.indexOf(this.searchTerm) >= 0);
    this.todos.done.filtered = this.todos.done.filtered.filter(todo => todo.content.indexOf(this.searchTerm) >= 0);
  } 

  filterTodos(tag: string): void {
    if (!tag) {
      this.showAllTodos();
    } else {
      if(this.appliedFilters.includes(tag)) {
        this.appliedFilters[this.appliedFilters.indexOf(tag)] = this.appliedFilters[this.appliedFilters.length - 1];
        this.appliedFilters.pop();
      } else {
        this.appliedFilters.push(tag);
      }
      this.applyFilters();
    }
  }

  showAllTodos(): void {
    this.appliedFilters = [];
    this.todos.todo.filtered = this.todos.todo.all.slice();
    this.todos.done.filtered = this.todos.done.all.slice();
    this.todos.todo.filtered = this.todos.todo.filtered.filter(todo => todo.content.indexOf(this.searchTerm) >= 0);
    this.todos.done.filtered = this.todos.done.filtered.filter(todo => todo.content.indexOf(this.searchTerm) >= 0);
  }

  searchTodos(): void {
    this.applyFilters();
    this.todos.todo.filtered = this.todos.todo.filtered.filter(todo => todo.content.indexOf(this.searchTerm) >= 0);
    this.todos.done.filtered = this.todos.done.filtered.filter(todo => todo.content.indexOf(this.searchTerm) >= 0);
  }

  assignTodo(todo: Todo, index: number): void {
    todo.assigned = !todo.assigned;
    const firsUnassignedIndex = this.todos.todo.all.findIndex(t => !t.assigned);
    console.log(index, firsUnassignedIndex);

    if (firsUnassignedIndex < index) {
      this.todos.todo.all[index] = { ...this.todos.todo.all[firsUnassignedIndex] }
      this.todos.todo.all[firsUnassignedIndex] = { ...todo };
    }

    this.applyFilters();
  }
}
