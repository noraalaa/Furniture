import { Component, Input, OnInit, Output,EventEmitter } from '@angular/core';
//import { EventEmitter } from 'events';

@Component({
  selector: 'app-rating',
  templateUrl: './rating.component.html',
  styleUrls: ['./rating.component.css']
})
export class RatingComponent implements OnInit {
  NumberOfStars = [1,2,3,4,5]
  @Input() star:number = 1;
  @Output() starChanged=new EventEmitter<number>();
  constructor() { }

  ngOnInit(): void {
  }
  changeRathig(rate:number){
    this.star = rate;
    this.starChanged.emit(rate);
  }

}
