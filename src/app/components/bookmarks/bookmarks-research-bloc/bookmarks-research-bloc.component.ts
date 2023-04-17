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
  
  onEditCity() {
    this.cityName ? this.bookmarksService.resetSearch({
      ...this.bookmarksService.researchParamsBookmarks,
      cityName: this.cityName,
      keyword: null,
      secondaryActivity: null,
      primaryActivity: null
    }) : 
      this.primaryActivity ? this.secondaryActivity ? this.onSecondaryActivityChange() : 
      this.onPrimaryActivityChange() : 
        this.keyword ? 
        this.onEditKeyword() : 
        this.bookmarksService.resetSearch({
          ...this.bookmarksService.researchParamsBookmarks,
          keyword: null,
          cityName: null,
          secondaryActivity: null,
          primaryActivity: null,
        })
    
  }
  onPrimaryActivityChange() {
    this.primaryActivity ? this.bookmarksService.resetSearch({
      ...this.bookmarksService.researchParamsBookmarks,
      cityName: null,
      keyword: null,
      secondaryActivity: null,
      primaryActivity: this.primaryActivity!.name
    }) : 
      this.cityName ? 
      this.onEditCity() :
        this.keyword ? 
        this.onEditKeyword() :
          this.bookmarksService.resetSearch({
            ...this.bookmarksService.researchParamsBookmarks,
            keyword: null,
            cityName: null,
            secondaryActivity: null,
            primaryActivity: null,
          })
  }

  onSecondaryActivityChange() {
    this.secondaryActivity ?
    this.bookmarksService.resetSearch({
      ...this.bookmarksService.researchParamsBookmarks,
      cityName: null,
      keyword: null,
      secondaryActivity: this.secondaryActivity!.name,
      primaryActivity: this.primaryActivity!.name
    }) : this.onPrimaryActivityChange() 
  }

  onEditKeyword() {
    this.keyword ? this.bookmarksService.resetSearch({
      ...this.bookmarksService.researchParamsBookmarks,
      keyword: this.keyword,
      cityName: null,
      secondaryActivity: null,
      primaryActivity: null
    }) :
      this.cityName ? 
      this.onEditCity() :
        this.primaryActivity ? this.secondaryActivity ? this.onSecondaryActivityChange() : 
        this.onPrimaryActivityChange() :
        this.bookmarksService.resetSearch({
          ...this.bookmarksService.researchParamsBookmarks,
          keyword: null,
          cityName: null,
          secondaryActivity: null,
          primaryActivity: null,
        });
  }
}
