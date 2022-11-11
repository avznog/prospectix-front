import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { CreateUserDto } from 'src/app/dto/users/create-user.dto';
import { ProjectManager } from 'src/app/models/project-manager.model';
import { ResearchParamsUsers } from 'src/app/models/research-params-users.model';
import { ToastsService } from "../toasts/toasts.service";
@Injectable({
  providedIn: 'root'
})
export class UsersService {

  users = new Map<number, ProjectManager>();
  researchParamsUsers : ResearchParamsUsers = {
    skip: 0,
    take: 20
  }
  constructor(
    private http: HttpClient,
    private readonly toastsService: ToastsService
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

  create(createUserDto: CreateUserDto) : Subscription{
    return this.http.post<ProjectManager>("project-managers/", createUserDto).subscribe(user => this.users.set(user.id, user));
  }

  delete(userId: number) : Subscription {
    return this.http.patch<ProjectManager>(`project-managers/disable/${userId}`, { disabled: true }).subscribe(() => this.users.set(userId, { ...this.users.get(userId)!, disabled: true }));
  }

  enable(userId: number) : Subscription {
    return this.http.patch<ProjectManager>(`project-managers/enable/${userId}`, { disable: false }).subscribe(() => this.users.set(userId, { ...this.users.get(userId)!, disabled: false }));
  }

  changeAdmin(userId: number,admin: boolean) : Subscription {
    return this.http.patch<ProjectManager>(`project-managers/${userId}`, {admin}).subscribe(() => this.users.set(userId, { ...this.users.get(userId)!, admin: admin}));
  }

  changeStatsEnabled(userId: number, statsEnabled: boolean) : Subscription {
    return this.http.patch<ProjectManager>(`project-managers/${userId}`, {statsEnabled}).subscribe(() => this.users.set(userId, { ...this.users.get(userId)!, statsEnabled: statsEnabled}));
  }

  changeObjectived(userId: number, objectived: boolean) : Subscription {
    return this.http.patch<ProjectManager>(`project-managers/${userId}`, { objectived }).subscribe(() => {
      this.users.set(userId, { ...this.users.get(userId)!, objectived: objectived});
      this.toastsService.addToast({
        type: objectived ? "alert-success" : "alert-error",
        message: `${this.users.get(userId)!.pseudo} ${objectived ? 'ajouté aux' : 'supprimé des'} objectifs`
      })
    });
  }
}
