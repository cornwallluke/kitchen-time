import { Component, ElementRef, AfterViewInit, ViewChild } from '@angular/core';
import { ArrayDestructuringAssignment } from 'typescript';
import {TimersService} from "../timers.service";
declare var $: any

@Component({
  selector: 'app-add-modal',
  templateUrl: './add-modal.component.html',
  styleUrls: ['./add-modal.component.css']
})
export class AddModalComponent{
  public duration:any;
  public timername: string;
  constructor(private timerService: TimersService,) {
    this.timerService=timerService;
    this.duration = "00:00:30"
  }

  ngAfterViewInit(): void {
    console.log("initmod");
    this.timerService.getAdding().subscribe(x=>{
      
      if(x){
        $("#addmodal").modal("show")
      }else{
        $("#addmodal").modal("hide")
      }
      
    });
  }
  addTimer():void{
    console.log(this.duration);
    $("#addmodal").modal("hide")
    // let hours:number, minutes:number, seconds:number;
    let [hours, minutes, seconds] : Array<number> = this.duration.split(":").map(x => parseInt(x)).concat([0,0,0])
    console.log(hours, minutes, seconds);
    this.timerService.newTimer(Date.now(), Date.now()+1000*seconds+60*1000*minutes+60*60*1000*hours, this.timername?.trim() ? this.timername.trim() : "Timer");
  }

}
