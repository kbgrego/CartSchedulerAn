import { Component, OnInit } from '@angular/core';
import { Schedule } from '../schedule';
import { Logger } from '../logger.service';
import { ScheduleService } from '../schedule.service';
import { TelegramBotService } from '../telegram-bot.service';
import { WeekDay } from '@angular/common';

@Component({
  selector: 'app-management',
  templateUrl: './management.component.html',
  styleUrls: ['./management.component.css'],
  providers: [ScheduleService, Logger]
})
export class ManagementComponent implements OnInit {
  weekdays = new Array('', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье');

  schedules?: Schedule[];

  scheduleNew = new Schedule();

  scheduleWeek: number[] = [3,4,5,6,7,1,2];

  constructor(private logger: Logger, private scheduleService: ScheduleService, private telegram: TelegramBotService) {
    this.schedules = this.scheduleService.get(new Date());
    this.schedules.push(this.scheduleNew);
    logger.log(this.schedules.length);
  }

  OnInit(): void {    
  }

  ngOnInit(): void {
  }

  getSchedule(weekday: number, time: string) {
    if (this.schedules != undefined) {
      var sorted = this.schedules.filter(x => x.weekday == weekday && x.time == time)
        .sort((x, y) => x.time.localeCompare(y.time));

      for (var i = 0; i < sorted.length - 1; i++) {        
        if (sorted[i].time != sorted[i + 1].time)
          sorted[i].divBreak = true;
      }

      return sorted;
    }
    return null;
  }

  getScheduleDayTime(weekday: number): string[] {
    let times = [];
    if (this.schedules != undefined) {
      var allTimes = this.schedules.map(x => x.time);
          allTimes = allTimes.filter((item, index, array) => array.indexOf(item) === index);

      for (let time in allTimes) {
        times[times.length] = allTimes[time];
      }
    }
    times.sort((x, y) => x.localeCompare(y));
    return times;
  }

  onSend(): void {
    if (this.schedules != undefined) {
      let sorted = Schedule.sortForSending(this.schedules);      
      for(let i=0;i<sorted.length;i++) {
        console.log(`${sorted[i].cart} ${sorted[i].getWeekday()} ${sorted[i].time}`);
        this.telegram.sendSchedule(sorted[i]);
      }
    }
  }

  onClickStore(): void {
    this.scheduleService.store();
  }

  onScheduleAdd(day: number): void {

  }

  addNewSchedule(schedule: Schedule): void {
    this.scheduleService.add(schedule.copy());
    //ыschedule.empty();
  }
}
