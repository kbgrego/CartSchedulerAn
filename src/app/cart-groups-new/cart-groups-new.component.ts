import { Component, Input, OnInit } from '@angular/core';
import { Schedule } from '../schedule';
import { ScheduleService } from '../schedule.service';
import { ManagementComponent } from '../management/management.component';

@Component({
  selector: 'app-cart-groups-new',
  templateUrl: './cart-groups-new.component.html',
  styleUrls: ['./cart-groups-new.component.css']
})
export class CartGroupsNewComponent implements OnInit {

  @Input() schedule: Schedule = new Schedule();

  scheduleWeek: number[] = [3, 4, 5, 6, 7, 1, 2];

  constructor(private scheduleService: ScheduleService, private managementComponent: ManagementComponent) { }

  ngOnInit(): void {
  }

  getWeekday(day: number): string {
    return Schedule.getWeekday(day);
  }

  onClickSave(): void {
    this.managementComponent.addNewSchedule(this.schedule);
  }
}
