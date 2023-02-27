import { Component, Input, OnInit } from '@angular/core';
import { Schedule } from '../schedule';
import { Logger } from '../logger.service';
import { ScheduleService } from '../schedule.service';


@Component({
  selector: 'app-cart-groups',
  templateUrl: './cart-groups.component.html',
  styleUrls: ['./cart-groups.component.css']
})
export class CartGroupsComponent implements OnInit {

  @Input() schedule: Schedule = new Schedule();

  @Input() isNew: boolean = false;

  constructor(private scheduleService: ScheduleService) { }


  onChange(value: boolean) {
    this.schedule.print = value;
  }

  onInit(): void {

  }

  ngOnInit(): void {

  }

  onClickRemove(schedule: Schedule): void {
    this.scheduleService.delete(schedule);
  }
}
