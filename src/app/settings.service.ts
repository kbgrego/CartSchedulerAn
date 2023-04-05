import { Injectable } from '@angular/core';
import { Item } from './item';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  Settings: Setting[]; 
  Items: Item[];

  DefaultSettings: Setting[] = [
    { "label": "Chat Id", "name": "ChatId", "value": "" },
    { "label": "Bot Id", "name": "ChatBotId", "value": "" },
    { "label": "Bot token", "name": "ChatBotToken", "value": "" }
  ];


  constructor() {
    let sets = window.localStorage.getItem('cart-settings');
    let carts = window.localStorage.getItem('cart-list');

    console.log(sets);
    if (sets != null) {
      let loadSets = JSON.parse(sets);
      this.Settings = loadSets;
    } else {
      this.Settings = this.DefaultSettings;
    }
    
    if (carts != null) {
      let loadItems = JSON.parse(carts);
      this.Items = loadItems;
    } else {
      this.Items = [];
    }    
  }

  getSettings() {
    return this.Settings;
  }

  getCarts() {
    return this.Items;
  }

  get(name: string): string {
    let setting = this.Settings.find(x => x.name == name);
    return setting == null ? "" : setting.value;
  }

  store(): void {
    window.localStorage.setItem('cart-settings', JSON.stringify(this.Settings));
    window.localStorage.setItem('cart-list', JSON.stringify(this.Items));
  }
}

export interface Setting {
  name: string;
  value: string;
  label: string;
}