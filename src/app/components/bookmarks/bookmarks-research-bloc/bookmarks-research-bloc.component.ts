import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Activity } from 'src/app/models/activity.model';
import { City } from 'src/app/models/city.model';
import { ProjectManager } from 'src/app/models/project-manager.model';
import { ResearchParamsBookmarks } from 'src/app/models/research-params-bookmarks.model';
import { ActivitiesService } from 'src/app/services/activities/activities.service';
import { CitiesService } from 'src/app/services/cities/cities.service';
import { ProjectManagersService } from 'src/app/services/project-managers/project-managers.service';

@Component({
  selector: 'app-bookmarks-research-bloc',
  templateUrl: './bookmarks-research-bloc.component.html',
  styleUrls: ['./bookmarks-research-bloc.component.scss']
})
export class BookmarksResearchBlocComponent implements OnInit {

  @Input() researchParamsBookmark!: ResearchParamsBookmarks;
  @Output() updateResearchParamsBookmarkEvent = new EventEmitter<ResearchParamsBookmarks>();

  formKeyword = new FormControl("");
  formActivity = new FormControl("allActivities");
  formCity = new FormControl("allCities");
  formPm = new FormControl("");

  projectManagers!: ProjectManager[];

  constructor(
    public readonly activitiesService: ActivitiesService,
    public readonly citiesService: CitiesService,
    private readonly pmService: ProjectManagersService
  ) { }

  ngOnInit(): void {
      this.pmService.findAll()
        .subscribe({
          next: (data) => {
            this.projectManagers = data;
          },
          error: (err) => {
            console.log(err);
          }
        })
  }

  onEditKeyword() {
    this.updateResearchParamsBookmarks({
      ...this.researchParamsBookmark,
      keyword: this.formKeyword.value
    });
  }

  onEditActivity() {
    this.updateResearchParamsBookmarks({
      ...this.researchParamsBookmark,
      activity: this.formActivity.value == "allActivities" ? "" : this.formActivity.value
    });
  }

  onEditCity() {
    this.updateResearchParamsBookmarks({
      ...this.researchParamsBookmark,
      city: this.formCity.value == "allCities" ? "" : this.formCity.value
    });
  }

  onEditPm() {
    this.updateResearchParamsBookmarks({
      ...this.researchParamsBookmark,
      pseudo: this.formPm.value
    })
  }

  updateResearchParamsBookmarks(value: ResearchParamsBookmarks) {
    this.updateResearchParamsBookmarkEvent.emit(value);
  }
}
