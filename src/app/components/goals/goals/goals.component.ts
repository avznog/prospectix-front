import { Component, OnInit } from '@angular/core';
import { Goal } from 'src/app/models/goal.model';
import { GoalsService } from 'src/app/services/goals/goals.service';

@Component({
  selector: 'app-goals',
  templateUrl: './goals.component.html',
  styleUrls: ['./goals.component.scss']
})
export class GoalsComponent implements OnInit {

  constructor(
    public goalsService: GoalsService
  ) { }

  ngOnInit(): void {
  }

  pageDown() {
    this.goalsService.updateSearchParameters({
      ...this.goalsService.researchParamsGoals,
      skip: this.goalsService.researchParamsGoals.skip - 2
    });
  }
  
  pageUp() {
    this.goalsService.updateSearchParameters({
      ...this.goalsService.researchParamsGoals,
      skip: this.goalsService.researchParamsGoals.skip + 2
    });
  }

}
