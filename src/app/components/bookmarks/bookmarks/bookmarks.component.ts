import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { ProjectManager } from 'src/app/models/project-manager.model';
import { Prospect } from 'src/app/models/prospect.model';
import { ProjectManagersService } from 'src/app/services/project-managers/project-managers.service';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';

@Component({
  selector: 'app-bookmarks',
  templateUrl: './bookmarks.component.html',
  styleUrls: ['./bookmarks.component.scss']
})
export class BookmarksComponent implements OnInit {

  projectManagers!: ProjectManager[];
  prospects!: Prospect[];
  formControlPm = new FormControl("", Validators.required)

  constructor(
    private prospectsService: ProspectsService,
    private pmService: ProjectManagersService
  ) { }

  ngOnInit(): void {
    // TODO  CURRENT PM
    this.prospectsService.findAllByBookmarks("bgonzva")
      .subscribe({
        next: (data) => {
          console.log(data)
          this.prospects = data;
        },
        error: (err) => {
          console.log(err)
        }
      });

    this.pmService.findAll()
      .subscribe({
        next: (data) => {
          this.projectManagers = data.filter((pm) => !pm.disabled);
          console.log(this.projectManagers);
        },
        error: (err) => {
          console.log(err);
        }
      })
  }

  onChangePm() {
    console.log(this.formControlPm.value)
    this.prospectsService.findAllByBookmarks(this.formControlPm.value)
    .subscribe({
      next: (data) => {
        console.log(data)
        this.prospects = data;
      },
      error: (err) => {
        console.log(err)
      }
    });
  }
}
