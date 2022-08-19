import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from "@angular/common/http";
import { ProjectManager } from 'src/app/models/project-manager.model';
import { Observable, Subscription } from 'rxjs';
import { ResearchParamsUsers } from 'src/app/models/research-params-users.model';
import { CreateUserDto } from 'src/app/dto/users/create-user.dto';
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users = new Map<number, ProjectManager>();
  researchParamsUsers : ResearchParamsUsers = {
    skip: 0,
    take: 2
  }
  constructor(
    private http: HttpClient
  ) { 
    this.loadMore();
  }

  resetSearch(researchParamsUsers: ResearchParamsUsers) {
    this.users.clear();
    this.updateSearchParameters({
      ...researchParamsUsers,
      skip: 0
    });
  }

  updateSearchParameters(researchParamsUsers: ResearchParamsUsers) {
    if(researchParamsUsers != this.researchParamsUsers)
      this.researchParamsUsers = researchParamsUsers;
      this.loadMore();
  }

  loadMore() {
    let queryParameters = new HttpParams();

    queryParameters = queryParameters.append("take", this.researchParamsUsers.take);
    queryParameters = queryParameters.append("skip", this.researchParamsUsers.skip);

    this.http.get<ProjectManager[]>(`project-managers/find-all-paginated/`, { params: queryParameters}).subscribe(users => users.forEach(user => this.users.set(user.id, user)));
  }

  findAll() : Observable<ProjectManager[]> {
    return this.http.get<ProjectManager[]>("project-managers/findAll");
  }

  create(createUserDto: CreateUserDto) : Subscription{
    return this.http.post<ProjectManager>("project-managers/", createUserDto).subscribe(user => this.users.set(user.id, user));
  }

  delete(id: number) : Subscription {
    return this.http.patch<ProjectManager>(`project-managers/disable/${id}`, { disabled: true }).subscribe();
  }

  enable(id: number) : Subscription {
    return this.http.patch<ProjectManager>(`project-managers/enable/${id}`, { disable: false }).subscribe();
  }

  changeAdmin(id: number,admin: boolean) : Subscription {
    return this.http.patch<ProjectManager>(`project-managers/${id}`, {admin}).subscribe();
  }
}
