import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectManager } from 'src/app/models/project-manager.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectManagersService {

  constructor(
    private http: HttpClient
  ) { }

  findAll() : Observable<ProjectManager[]> {
    return this.http.get<ProjectManager[]>("http://localhost:3000/project-managers/findAll");
  }
}
