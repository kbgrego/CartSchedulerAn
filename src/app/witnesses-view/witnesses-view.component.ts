import { Component, OnInit } from '@angular/core';
import { SettingsService } from '../settings.service';
import { Witness } from '../witness';

@Component({
  selector: 'app-witnesses-view',
  templateUrl: './witnesses-view.component.html',
  styleUrls: ['./witnesses-view.component.css']
})
export class WitnessesViewComponent implements OnInit {

  witnesses: Witness[] = this.settingsService.getWitnesses();

  newWitness: Witness = { 
    name: '',
    telegramId: 0,
    telegramName: '',
    activated: false
   };

  constructor(private settingsService: SettingsService) { }

  ngOnInit(): void {
  }

  addRow() {
    this.witnesses.push(this.newWitness);
    this.newWitness = {
      name: '',
      telegramId: 0,
      telegramName: '',
      activated: false
    };
  }

  deleteRow(index: number) {
    this.witnesses.splice(index, 1);
  }

  saveChanges() {
    this.settingsService.store();
  }   
}
