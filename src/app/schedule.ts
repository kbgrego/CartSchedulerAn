import * as moment from 'moment';

const weekdays = new Array('', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье');

export class Schedule implements iSchedule {
  

  public cart: string = '';
  public time: string = '';
  public weekday: number = 0;
  public print: boolean = false;
  public witn: Array<string> = [];
  public divBreak: boolean = false;

  constructor(cart: string = '', time: string = '', weekday: number = 0, print: boolean = false, witn: Array<string> = []) {
    this.cart = cart;
    this.time = time;
    this.weekday = weekday;
    this.print = print;
    this.witn = witn;
  }

  public static getWeekday(weekday: number): string {
    return weekdays[weekday];
  }

  public getWeekday(): string {
    return Schedule.getWeekday(this.weekday);
  }

  getDate(): string {
    let curWeekday = new Date().getDay();
    let date = new Date();
    if (this.weekday < curWeekday)
      date = this.addDays(new Date(), 7 + this.weekday - curWeekday);
    else
      date = this.addDays(new Date(), this.weekday - curWeekday);
    return (moment(date)).format('(DD.MM)');
  }

  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }
}

export interface iSchedule {
  cart: string;
  time: string;
  weekday: number;
  witn: string[];
}
