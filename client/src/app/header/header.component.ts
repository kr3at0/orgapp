import { Component, OnInit } from '@angular/core';
import { Todo } from '../todo';
import { TODOS } from '../mock-todos';
import * as moment from 'moment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl']
})
export class HeaderComponent implements OnInit {
  time: moment.Moment = moment();
  next: Todo = TODOS[0];

  constructor() { }

  ngOnInit() {
    setInterval(() => {
      this.time = moment();
    }, 1);

    console.log(this.next);
  }

}
