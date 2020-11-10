import { Component, OnInit } from '@angular/core';
import {timer, TimersService} from "../timers.service";
import {combineLatest, Observable} from "rxjs";

@Component({
  selector: 'app-holder',
  templateUrl: './holder.component.html',
  styleUrls: ['./holder.component.css']
})
export class HolderComponent implements OnInit {
  public timers:Observable<timer[]>;
  public tick:Observable<number>;
  constructor(private timerService:TimersService) { }

  ngOnInit(): void {
    this.timers = this.timerService.getTimers();
    this.timerService.addTimer();
    this.tick = this.timerService.getTick();
  }

  added(event:MouseEvent):void{
    this.timerService.addTimer();
  }
  rem(torem: timer):void{
    this.timerService.removeTimer(torem);
  }
  now():number{
    return Date.now();
  }
}
