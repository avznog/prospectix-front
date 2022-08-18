import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { ProjectManager } from 'src/app/models/project-manager.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectManagersService {

  projectManagers: ProjectManager[] = [];
  constructor(
    private http: HttpClient
  ) { 
    this.findAll().subscribe(projectManagers => this.projectManagers = projectManagers);
  }

  findAll() {
    return this.http.get<ProjectManager[]>("project-managers/findAll");
  }
}
