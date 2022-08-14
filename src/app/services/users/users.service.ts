import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { ProjectManager } from 'src/app/models/project-manager.model';
import { Observable, Subscription } from 'rxjs';
import { ResearchParamsUsers } from 'src/app/models/research-params-users.model';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  constructor(
    private http: HttpClient
  ) { }

  findAll() : Observable<ProjectManager[]> {
    return this.http.get<ProjectManager[]>("http://localhost:3000/project-managers/findAll");
  }

  create(user: ProjectManager) : Subscription{
    return this.http.post<ProjectManager>("http://localhost:3000/project-managers/", user).subscribe();
  }

  delete(id: number) : Subscription {
    return this.http.patch<ProjectManager>(`http://localhost:3000/project-managers/disable/${id}`, { disabled: true }).subscribe();
  }

  enable(id: number) : Subscription {
    return this.http.patch<ProjectManager>(`http://localhost:3000/project-managers/enable/${id}`, { disable: false }).subscribe();
  }

  changeAdmin(id: number,admin: boolean) : Subscription {
    return this.http.patch<ProjectManager>(`http://localhost:3000/project-managers/${id}`, {admin}).subscribe();
  }

  findAllPaginated(researchParamsUsers: ResearchParamsUsers) : Observable<ProjectManager[]> {
    let queryParameters = new HttpParams();

    queryParameters = queryParameters.append("take", researchParamsUsers.take);
    queryParameters = queryParameters.append("skip", researchParamsUsers.skip);

    return this.http.get<ProjectManager[]>(`http://localhost:3000/project-managers/find-all-paginated`, { params: queryParameters});
  }
}
