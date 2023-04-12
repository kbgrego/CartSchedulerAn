import { Injectable } from '@angular/core';
import { Item } from './item';
import { TimeGroup } from './time-group';
import { Witness } from './witness';

@Injectable({
  providedIn: 'root'
})
export class SettingsService {
  Settings: Setting[]; 
  Items: Item[];
  Times: TimeGroup[];
  Witnesses: Witness[];

  DefaultSettings: Setting[] = [
    { "label": "Chat Id", "name": "ChatId", "value": "" },
    { "label": "Bot Id", "name": "ChatBotId", "value": "" },
    { "label": "Bot token", "name": "ChatBotToken", "value": "" }
  ];  

  constructor() {
    let sets = window.localStorage.getItem('cart-settings');
    let carts = window.localStorage.getItem('cart-list');
    let times = window.localStorage.getItem('time-list');
    let witnesses = window.localStorage.getItem('witness-list');

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

    if (times != null) {
      let loadItems = JSON.parse(times);
      this.Times = loadItems;
    } else {
      this.Times = [];
    }        

    if (witnesses != null) {
      let loadItems = JSON.parse(witnesses);
      this.Witnesses = loadItems;
    } else {
      this.Witnesses = [];
    }
  }

  getSettings() {
    return this.Settings;
  }

  getCarts() {
    return this.Items;
  }

  getTimes() {
    return this.Times;
  }

  getWitnesses() {
    return this.Witnesses;
  }

  get(name: string): string {
    let setting = this.Settings.find(x => x.name == name);
    return setting == null ? "" : setting.value;
  }

  store(): void {
    window.localStorage.setItem('cart-settings', JSON.stringify(this.Settings));
    window.localStorage.setItem('cart-list', JSON.stringify(this.Items));
    window.localStorage.setItem('time-list', JSON.stringify(this.Times));
    window.localStorage.setItem('witness-list', JSON.stringify(this.Witnesses));
  }
}

export interface Setting {
  name: string;
  value: string;
  label: string;
}