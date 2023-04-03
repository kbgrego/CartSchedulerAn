import * as moment from 'moment';

const weekdays = new Array('', 'Понедельник', 'Вторник', 'Среда', 'Четверг', 'Пятница', 'Суббота', 'Воскресенье');

export class Schedule implements iSchedule {
  

  public cart: string = '';
  public time: string = '';
  public weekday: number = 0;
  public print: boolean = false;
  public witn: Array<string> = [];
  public divBreak: boolean = false;

  constructor(cart: string = '', time: string = '', weekday: number = 0, print: boolean = false, witn: Array<string> = ['','','','']) {
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
    const targetWeekday = this.weekday;
    const currentDate = new Date();
    const currentWeekday = currentDate.getDay();
    const daysUntilTarget = (targetWeekday - currentWeekday + 7) % 7;
    const targetDate = new Date(currentDate.getTime() + daysUntilTarget * 24 * 60 * 60 * 1000);
    return moment(targetDate).format('(DD.MM)');
  }

  addDays(date: Date, days: number): Date {
    date.setDate(date.getDate() + days);
    return date;
  }

  copy(): Schedule {
    let witn = this.witn.slice();
    return new Schedule(this.cart, this.time, this.weekday, this.print, witn);
  }

  validate(): boolean {
    return this.cart != '' &&
           this.time != '' &&
           this.weekday != 0;
  }

  empty(): void {
    this.cart = '';
    this.time = '';
    this.weekday = 0;
    this.print = false;
    this.witn = ['','','',''];
  }

  static sortForSending(schedules: Schedule[]) {
    let curWeekday = new Date().getDay();
    var sorted = schedules.filter(x => x.weekday > 0) // x.print)
                          .sort((x, y) => x.time.localeCompare(y.time))
                          .sort((x, y) => (x.weekday <= curWeekday ? 7 : 0 ) + x.weekday - y.weekday - (y.weekday <= curWeekday ? 7 : 0 ));
    return sorted;
  }  
}

export interface iSchedule {
  cart: string;
  time: string;
  weekday: number;
  witn: string[];
}
