import { Component, Input, OnInit } from '@angular/core';
import { Schedule } from '../schedule';
import { Logger } from '../logger.service';
import { ScheduleService } from '../schedule.service';
import { SettingsService } from '../settings.service';
import { Witness } from '../witness';


@Component({
  selector: 'app-cart-groups',
  templateUrl: './cart-groups.component.html',
  styleUrls: ['./cart-groups.component.css']
})
export class CartGroupsComponent implements OnInit {

  @Input() schedule: Schedule = new Schedule();

  @Input() isNew: boolean = false;

  witnesses: String[] = [];

  constructor(private scheduleService: ScheduleService, private settings: SettingsService) { }


  onChange(value: boolean) {
    this.schedule.print = value;
  }

  onInit(): void {

  }

  ngOnInit(): void {
    this.witnesses = this.getNameList()
                          .filter(w => w.activated)
                          .map(w => w.name)
                          .sort((a, b) => a.localeCompare(b));
  }

  getNameList(): Witness[] {
    let witn = this.settings.getWitnesses();
    witn.filter(w => w.activated)
        .sort((a, b) => a.name.localeCompare(b.name));

   return witn;
 }


  onClickRemove(schedule: Schedule): void {
    this.scheduleService.delete(schedule);
  }
}
