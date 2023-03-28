import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { HttpHeaders } from '@angular/common/http';
import { Logger } from './logger.service';
import { Schedule } from './schedule';
import { SettingsService } from './settings.service';

@Injectable({
  providedIn: 'root'
})
export class TelegramBotService {
  botLink:string = "";

  constructor(private settingsService:SettingsService, private http: HttpClient, private logger: Logger) {
    this.botLink = `https://api.telegram.org/bot${settingsService.get('ChatBotId')}:${settingsService.get('ChatBotToken')}`;
  }

  sendBotRequestGetUpdates(): void {
    var url = this.botLink + '/getUpdates';
    var response;
    this.http.get<String>(url).subscribe(results => this.logger.log(results));
  }

  sendCartSchedulePolls(): void { }

  sendBotRequestSendMessage(message: string): void {
    var formData = JSON.stringify(
      {
        "chat_id": this.settingsService.get('ChatId'),
        "text": message,
        "parse_mode": "MarkdownV2",
        "disable_notification": true
      });

    var headers = new HttpHeaders({
      "Content-Type": "application/json",
      "Accept": "application/json"
    });

    var url = this.botLink + '/sendMessage';

    //this.logger.log(formData);

    this.http.post(url, formData, {headers: headers}).subscribe();
    this.sleep(500);
  }

  sendSchedule(schedule: Schedule) {
    var mes = `\\[${schedule.cart}\\] *${schedule.getWeekday()}* ${schedule.getDate()} \n`;
    mes += '_' + schedule.time + '_\n';
    mes += `1. ${schedule.witn[0]} \n`;
    mes += `2. ${schedule.witn[1]} \n`;
    mes += `3. ${schedule.witn[2]} \n`;
    mes += `4. ${schedule.witn[3]} \n`;

    mes = mes.replaceAll('(', '\\(');
    mes = mes.replaceAll(')', '\\)');
    mes = mes.replaceAll('.', '\\.');
    mes = mes.replaceAll('-', '\\-');

    //console.log(mes);
    this.sendBotRequestSendMessage(mes);
  }

  sleep(milliseconds:number) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

}
