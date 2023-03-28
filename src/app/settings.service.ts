import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  Settings: Setting[]; 

  DefaultSettings: Setting[] = [
    { "label": "Chat Id", "name": "ChatId", "value": "" },
    { "label": "Bot Id", "name": "ChatBotId", "value": "" },
    { "label": "Bot token", "name": "ChatBotToken", "value": "" }
  ];


  constructor() {
    let sets = window.localStorage.getItem('cart-settings');
    console.log(sets);
    if (sets != null) {
      let loadSets = JSON.parse(sets);
      this.Settings = loadSets;
    } else {
      this.Settings = this.DefaultSettings;
    }
  }

  getSettings() {
    return this.Settings;
  }

  get(name: string): string {
    let setting = this.Settings.find(x => x.name == name);
    return setting == null ? "" : setting.value;
  }

  store(): void {
    window.localStorage.setItem('cart-settings', JSON.stringify(this.Settings));
  }
}

export interface Setting {
  name: string;
  value: string;
  label: string;
}