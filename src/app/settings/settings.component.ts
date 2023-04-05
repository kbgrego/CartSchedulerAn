
import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service'
import { TelegramBotService } from '../telegram-bot.service';
import { Item } from '../item';

@Component({
  selector: 'app-settings',
  templateUrl: './settings.component.html',
  styleUrls: ['./settings.component.css'],
  providers: [SettingsService] 
})

export class SettingsComponent implements OnInit {

  settings = this.settingsService.getSettings();
  items: Item[] = this.settingsService.getCarts();
  
  constructor(private settingsService: SettingsService, private telegram: TelegramBotService) { }

  ngOnInit(): void {
  }

  onClickStore(): void {
    this.settingsService.store();
  }

  onClickTest(): void {
    this.telegram.sendBotRequestSendMessage('test');
  }

  

  addItem() {
    this.items.push({ name: '' });
  }

  removeItem(index: number) {
    this.items.splice(index, 1);
  }

  saveItem(index: number) {
    this.settingsService.store();
  }  
}
