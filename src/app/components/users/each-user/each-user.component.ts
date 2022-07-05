import { Component, Input, OnInit } from '@angular/core';
import { ProjectManager } from 'src/app/models/project-manager.model';

@Component({
  selector: 'app-each-user',
  templateUrl: './each-user.component.html',
  styleUrls: ['./each-user.component.scss']
})
export class EachUserComponent implements OnInit {
  @Input() user!: ProjectManager;
  constructor() { }

  ngOnInit(): void {
  }

}
