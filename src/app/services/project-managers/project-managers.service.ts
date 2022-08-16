import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { ProjectManager } from 'src/app/models/project-manager.model';
import { ResearchParamsUsers } from 'src/app/models/research-params-users.model';

@Injectable({
  providedIn: 'root'
})
export class ProjectManagersService {

  constructor(
    private http: HttpClient
  ) { }

  findAll() : Observable<ProjectManager[]> {
    return this.http.get<ProjectManager[]>("project-managers/findAll");
  }
}
