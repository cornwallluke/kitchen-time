import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable, of, Subject } from 'rxjs';


export class timer{
  starttime: number;
  finishtime: number;
  name: String;
}

@Injectable({
  providedIn: 'root'
})
export class TimersService {
  private timers:BehaviorSubject<timer[]>;
  private tick:Subject<number>;
  private adding:BehaviorSubject<boolean>;

  constructor() { 
    this.timers = new BehaviorSubject<timer[]>([]);
    this.adding = new BehaviorSubject<boolean>(false);
    this.tick = new Subject<number>();
    setInterval(()=>{
      this.tick.next(Date.now())
    }, 1000);
  }
  ngDest
  getTimers(): Observable<timer[]>{
    return this.timers;
  }
  getAdding(): Observable<boolean>{
    return this.adding;
  }
  getTick(){
    return this.tick;
  }
  addTimer(): void{
    this.adding.next(true);
    
  }
  newTimer(start:number, end:number, name: String): void{
    console.log(this.timers);
    this.timers.value.push({starttime:start, finishtime:end, name:name});
    
    this.adding.next(false);
    
  }
  removeTimer(torem: timer):void{
    this.timers.value.splice(this.timers.value.findIndex(t=>t.name==torem.name && t.starttime==torem.starttime && t.finishtime==torem.finishtime), 1);
  }
}
