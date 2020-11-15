import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';


export class timer{
  starttime: number;
  finishtime: number;
  name: String;
  muted: boolean = false; 
  constructor(starttime, finishtime, name, muted){
    this.starttime = starttime;
    this.finishtime = finishtime;
    this.name = name;
    this.muted = muted;
  }
  public isringing(time:number|undefined = undefined):boolean{
    console.log((time?time:Date.now())>this.finishtime && !this.muted)
    return (time?time:Date.now())>this.finishtime && !this.muted;
  }
  public mute(){
    this.muted = true;
  }
}

export class audio{
  private toner: HTMLAudioElement;
  public ringing: number;
  private wasringing: boolean;

  constructor(url: string){
    this.toner = new Audio(url);
    this.ringing = 0;
    this.wasringing = false;
  }
  load(){
    this.toner.load();
  }
  ring(num:number|undefined = undefined){
    this.ringing = num!==undefined?num:this.ringing;
    console.log(this.ringing);
    if(this.ringing && !this.wasringing){
      this.toner.play();
      this.wasringing = true;
    }
    if(this.ringing<1){
      this.wasringing = false
      this.toner.pause();
      // this.toner.fastSeek(0);
    }
  }
}

@Injectable({
  providedIn: 'root'
})
export class TimersService {
  private timers:BehaviorSubject<timer[]>;
  private tick:BehaviorSubject<number>;
  private adding:BehaviorSubject<boolean>;
  private ringer:audio;

  constructor() { 
    this.timers = new BehaviorSubject<timer[]>([]);
    this.adding = new BehaviorSubject<boolean>(false);
    this.tick = new BehaviorSubject<number>(Date.now());
    setInterval(()=>{
      this.tick.next(Date.now())
    }, 100);

    this.ringer = new audio("../assets/beep.mp3");

    this.tick.subscribe((time)=>{
      this.ringer.ring(this.timers.value.reduce((acc, val)=>{
        return acc+(val.isringing(time)?1:0)
      }, 0));
    });
  }
  getTimers(): Observable<timer[]>{
    return this.timers;
  }
  getAdding(): Observable<boolean>{
    return this.adding;
  }
  getTick(): BehaviorSubject<number>{
    return this.tick;
  }
  addTimer(): void{
    this.adding.next(true);
    
  }
  newTimer(start:number, end:number, name: String): void{
    console.log(this.timers);
    this.ringer.load();
    this.timers.value.push(new timer(start, end, name, false));
    
    this.adding.next(false);
    
  }
  removeTimer(torem: timer):void{
    this.timers.value.splice(this.timers.value.findIndex(t=>t.name==torem.name && t.starttime==torem.starttime && t.finishtime==torem.finishtime), 1);
  }
}
