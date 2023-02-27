import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  Settings: Setting[]; /* = [
    { "label": "Chat Id", "name": "ChatId", "value": "673371043" },
    { "label": "Bot Id", "name": "ChatBotId", "value": "6244748070" },
    { "label": "Bot token", "name": "ChatBotToken", "value": "AAHkJGXCEb9L4K4OQoW7pEPEF1d3W-v95f0" },
  ];
  ChatId: number = 673371043;
  ChatBotId: string = '6244748070';
  ChatBotToken: string = 'AAHkJGXCEb9L4K4OQoW7pEPEF1d3W-v95f0'; */

  DefaultSettings: Setting[] = [
    { "label": "Chat Id", "name": "ChatId", "value": "" },
    { "label": "Bot Id", "name": "ChatBotId", "value": "" },
    { "label": "Bot token", "name": "ChatBotToken", "value": "" },
    { "label": "Cart list", "name": "CartList", "value": "" },
  ];


  constructor() {
    let sets = window.localStorage.getItem('cart-settings');
    this.Settings = JSON.parse(sets == null ? JSON.stringify(this.DefaultSettings) : sets);
  }

  getSettings() {
    return this.Settings;
  }

  get(name: string): string {
    let setting = this.Settings.find(x => x.name == name);
    return setting == null ? "" : setting.value;
  }

  store(): void {
    window.localStorage.setItem('bot-settings', JSON.stringify(this.Settings));
  }
}

export interface Setting {
  name: string;
  value: string;
  label: string;
}