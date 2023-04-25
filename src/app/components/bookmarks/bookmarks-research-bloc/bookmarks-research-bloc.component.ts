import { Component, OnInit } from '@angular/core';
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
  cityName: string | null = null;
  secondaryActivity: SecondaryActivity | null = null;
  primaryActivity: PrimaryActivity | null = null;
  orderByDate: boolean = false;

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
      keyword: this.keyword == '' ? null : this.keyword,
      secondaryActivity: !this.primaryActivity ? null : !this.secondaryActivity ? null : this.secondaryActivity?.name,
      cityName: this.cityName,
      primaryActivity: this.primaryActivity?.name ?? null
    })
  }

  changePrimaryActivity() {
    this.secondaryActivity = null;
  }
}
