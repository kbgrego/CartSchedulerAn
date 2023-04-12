import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Logger } from './logger.service';
import { Schedule } from './schedule';
import { SettingsService } from './settings.service';
import { Observable, throwError } from 'rxjs';
import { catchError, map } from 'rxjs/operators';

interface TelegramApiResponse {
  ok: boolean;
  result?: {
    message_id: number;
  };
  error_code?: number;
  description?: string;
}

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

  sendBotRequestSendMessage(message: string): Observable<number> {
    const formData = {
      chat_id: this.settingsService.get('ChatId'),
      text: message,
      parse_mode: 'MarkdownV2',
      disable_notification: true
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json'
    });

    const url = `${this.botLink}/sendMessage`;

    return this.http.post<TelegramApiResponse>(url, JSON.stringify(formData), { headers }).pipe(
      map(response => {
        const messageId = response.result?.message_id;
        if (!messageId) {
          throw new Error('Unable to extract messageId from response');
        }
        return messageId;
      }),
      catchError(error => throwError(error))
    );
  }

  sendSchedule(schedule: Schedule): Observable<number> {
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
    if(schedule.messageId != 0) {
      this.sendBotRequestDeleteMessage(schedule.messageId).subscribe();
      schedule.messageId = 0;
    }
    
    return this.sendBotRequestSendMessage(mes);
  }

  sendBotRequestDeleteMessage(messageId: number): Observable<boolean> {
    const formData = {
      chat_id: this.settingsService.get('ChatId'),
      message_id: messageId
    };

    const headers = new HttpHeaders({
      'Content-Type': 'application/json',
      Accept: 'application/json'
    });

    const url = `${this.botLink}/deleteMessage`;

    return this.http.post<TelegramApiResponse>(url, JSON.stringify(formData), { headers }).pipe(
      map(response => {
        if (!response.ok) {
          throw new Error(response.description || 'Unknown error occurred');
        }
        return true;
      }),
      catchError(error => throwError(error))
    );
  }

  sleep(milliseconds:number) {
    const date = Date.now();
    let currentDate = null;
    do {
      currentDate = Date.now();
    } while (currentDate - date < milliseconds);
  }

}
