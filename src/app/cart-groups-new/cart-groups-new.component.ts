import { Component, Input, OnInit } from '@angular/core';
import { Schedule } from '../schedule';
import { ScheduleService } from '../schedule.service';
import { ManagementComponent } from '../management/management.component';
import { SettingsService } from '../settings.service';
import { Item } from '../item';
import { TimeGroup } from '../time-group';
import { Witness } from '../witness';

@Component({
  selector: 'app-cart-groups-new',
  templateUrl: './cart-groups-new.component.html',
  styleUrls: ['./cart-groups-new.component.css']
})
export class CartGroupsNewComponent implements OnInit {

  @Input() schedule: Schedule = new Schedule();

  scheduleWeek: number[] = [3, 4, 5, 6, 7, 1, 2];

  carts: Item[] = this.settings.getCarts();
  times: TimeGroup[] = this.settings.getTimes();
  witnesses: String[] = [];

  constructor(private managementComponent: ManagementComponent, private settings: SettingsService) { }

  ngOnInit(): void {
    this.witnesses = this.getNameList()
                         .filter(w => w.activated)
                         .map(w => w.name)
                         .sort((a, b) => a.localeCompare(b));
  }

  getWeekday(day: number): string {
    return Schedule.getWeekday(day);
  }

  onClickSave(): void {
    this.managementComponent.addNewSchedule(this.schedule);
  }

  getNameList(): Witness[] {
     let witn = this.settings.getWitnesses();
     witn.filter(w => w.activated)
         .sort((a, b) => a.name.localeCompare(b.name));

    return witn;
  }

  searchName(filter: string, item: Witness) {
    filter = filter.toLocaleLowerCase();
    return (item.name.toLocaleLowerCase().indexOf(filter) > -1);
  }
}
