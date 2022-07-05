import { Component, OnInit } from '@angular/core';
import { ProjectManager } from 'src/app/models/project-manager.model';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.scss']
})
export class ListUsersComponent implements OnInit {
  users!: ProjectManager[];
  constructor() { }

  ngOnInit(): void {
  }

}
