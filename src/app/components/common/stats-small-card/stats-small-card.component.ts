import { Component, Input, OnInit } from '@angular/core';

@Component({
  selector: 'app-stats-small-card',
  templateUrl: './stats-small-card.component.html',
  styleUrls: ['./stats-small-card.component.scss']
})
export class StatsSmallCardComponent implements OnInit {

  constructor() { }
  @Input() title: string = "";
  @Input() value: number = 0;
  ngOnInit(): void {
  }

}
