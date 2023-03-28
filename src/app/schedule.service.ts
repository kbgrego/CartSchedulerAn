import { Injectable } from '@angular/core';
import { SCHEDULES } from './mock-schedule';
import { Logger } from './logger.service';
import { iSchedule, Schedule } from './schedule';

@Injectable({
  providedIn: 'root'
})
export class ScheduleService {

  Schedules = SCHEDULES;

  constructor(private logger: Logger) {
    this. load();
  }

  load(): void {
    let stored = window.localStorage.getItem('schedule-settings');
    if (stored != null) {
      var storedList: iSchedule[] = JSON.parse(stored);
      this.Schedules = storedList.map(x => {
        if (x != null)
          return new Schedule(x.cart, x.time, x.weekday, false, x.witn);
        else
          return new Schedule();
      });
    } 
  }

  get(date: Date): Schedule[] {
    this.logger.log(`Getting schedule. ${SCHEDULES.length}`);      
    return this.Schedules;
  }

  store(): void {
    let store = this.Schedules.map(x =>
      <iSchedule>
      {
        cart: x.cart,
        time: x.time,
        weekday: x.weekday,
        witn: x.witn
      });
    window.localStorage.setItem('schedule-settings', JSON.stringify(store));
  }

  add(schedule: Schedule) {
    if(schedule.validate()) {
      this.Schedules.push(schedule);
      this.store();
    }
  }

  delete(schedule: Schedule) {
    let ind = this.Schedules.findIndex(x => {
      return x.cart == schedule.cart && x.time == schedule.time && x.weekday == schedule.weekday
    });

    if(ind != -1)
      delete this.Schedules[ind];
    this.store();
  }
}
