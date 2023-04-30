import { Component, OnInit } from '@angular/core';
import { City } from 'src/app/models/city.model';
import { PrimaryActivity } from 'src/app/models/primary-activity.model';
import { SecondaryActivity } from 'src/app/models/secondary-activity.model';
import { ActivitiesService } from 'src/app/services/activities/activities.service';
import { BookmarksService } from 'src/app/services/bookmarks/bookmarks.service';
import { CitiesService } from 'src/app/services/cities/cities.service';
import { ProjectManagersService } from 'src/app/services/project-managers/project-managers.service';

@Component({
  selector: 'app-bookmarks-research-bloc',
  templateUrl: './bookmarks-research-bloc.component.html',
  styleUrls: ['./bookmarks-research-bloc.component.scss']
})
export class BookmarksResearchBlocComponent implements OnInit {
  keyword: string | null = null;
  city: City | null = null;
  secondaryActivity: SecondaryActivity | null = null;
  primaryActivity: PrimaryActivity | null = null;
  zipcode: City | null = null;

  constructor(
    public readonly activitiesService: ActivitiesService,
    public readonly citiesService: CitiesService,
    public readonly pmService: ProjectManagersService,
    private readonly bookmarksService: BookmarksService,
  ) { }

  ngOnInit(): void {
    this.keyword = this.bookmarksService.researchParamsBookmarks.keyword;  
  }
  
  updateParameters() {
    this.bookmarksService.resetSearch({
      ...this.bookmarksService.researchParamsBookmarks,
      keyword: this.keyword != '' ? this.keyword ?? null : null,
      secondaryActivity: this.primaryActivity ? this.secondaryActivity?.id ?? null : null,
      city: this.city?.name ?? null,
      primaryActivity: this.primaryActivity?.id ?? null,
      zipcode: this.city ? this.zipcode?.zipcode ?? null : null
    })
  }

  changePrimaryActivity() {
    this.secondaryActivity = null;
  }

  changeCity() {
    this.zipcode = null;
  }
}
