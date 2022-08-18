import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
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
  formKeyword = new FormControl("");
  formActivity = new FormControl("allActivities");
  formCity = new FormControl("allCities");
  formPm = new FormControl("");

  constructor(
    public readonly activitiesService: ActivitiesService,
    public readonly citiesService: CitiesService,
    public readonly pmService: ProjectManagersService,
    private readonly bookmarksService: BookmarksService
  ) { }

  ngOnInit(): void {
  }

  onEditKeyword() {
    setTimeout(() => {
      this.bookmarksService.resetSearch({
        ...this.bookmarksService.researchParamsBookmarks,
        keyword: this.formKeyword.value
      });
    }, 200);
  }

  onEditActivity() {
    this.bookmarksService.resetSearch({
      ...this.bookmarksService.researchParamsBookmarks,
      activity: this.formActivity.value == "allActivities" ? "" : this.formActivity.value
    });
  }

  onEditCity() {
    this.bookmarksService.resetSearch({
      ...this.bookmarksService.researchParamsBookmarks,
      city: this.formCity.value == "allCities" ? "" : this.formCity.value
    });
  }

  onEditPm() {
    this.bookmarksService.resetSearch({
      ...this.bookmarksService.researchParamsBookmarks,
      pseudo: this.formPm.value
    });
  }
}
