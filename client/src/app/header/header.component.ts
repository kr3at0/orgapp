import { Component, OnInit } from '@angular/core';
import { Event } from '../event';
import { EVENTS } from '../mock-events';
import * as moment from 'moment';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.styl']
})
export class HeaderComponent implements OnInit {
  time: moment.Moment = moment();
  next: Event = EVENTS[0];

  constructor() { }

  ngOnInit() {
    setInterval(() => {
      this.time = moment();
    }, 1);

    console.log(this.time.date(), this.next);
  }

}
