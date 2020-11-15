import { Component, OnInit } from '@angular/core';
import {timer, TimersService} from "../timers.service";
import {BehaviorSubject, combineLatest, Observable} from "rxjs";

@Component({
  selector: 'app-holder',
  templateUrl: './holder.component.html',
  styleUrls: ['./holder.component.css']
})
export class HolderComponent implements OnInit {
  public timers:Observable<timer[]>;
  public tick:BehaviorSubject<number>;
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
  mute(tomute: timer):void{
    tomute.mute();
    console.log(tomute);
  }
  displayRemaining(rem: number){

    return (rem>0?"":"-")
            +(Math.floor(Math.abs(rem/3600000))>0?Math.floor(Math.abs(rem/3600000)).toFixed(0)+":":"")
            +(Math.floor(Math.abs(rem/60000))>0?Math.floor(Math.abs(rem%3600000/60000)).toFixed(0).padStart((Math.floor(Math.abs(rem/3600000))>0)?2:1, "0")+":":"")
            +(Math.abs((rem%60000/1000)).toFixed(1).padStart(4, "0"));
  }
}
