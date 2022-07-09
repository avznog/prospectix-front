import { Component, Input, OnInit } from '@angular/core';
import { Activity } from 'src/app/models/activity.model';
import { City } from 'src/app/models/city.model';
import { Prospect } from 'src/app/models/prospect.model';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';

@Component({
  selector: 'app-list-prospects',
  templateUrl: './list-prospects.component.html',
  styleUrls: ['./list-prospects.component.scss']
})
export class ListProspectsComponent implements OnInit {
  @Input() prospects!: Prospect[];
  @Input() currentCity!: City;
  @Input() currentActivity!: Activity;
  @Input() noProspect!: boolean;
  constructor(
    private readonly prospectsService: ProspectsService,
  ) { }

  ngOnInit(): void {
  }

}
