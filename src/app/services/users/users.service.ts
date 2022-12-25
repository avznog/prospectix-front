import { HttpClient, HttpParams } from "@angular/common/http";
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from "src/app/auth/auth.service";
import { CreateUserDto } from 'src/app/dto/users/create-user.dto';
import { UpdateUserDto } from "src/app/dto/users/update-user.dto";
import { ProjectManager } from 'src/app/models/project-manager.model';
import { ResearchParamsUsers } from 'src/app/models/research-params-users.model';
import { ProjectManagersService } from "../project-managers/project-managers.service";
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
    private readonly toastsService: ToastsService,
    private readonly authService: AuthService,
    private readonly pmService: ProjectManagersService
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
    return this.http.post<ProjectManager>("project-managers/", createUserDto).subscribe(user => {
      this.users.set(user.id, user)
      this.toastsService.addToast({
        type: "alert-success",
        message: `${createUserDto.pseudo} ajouté`
      })
    });
  }

  delete(userId: number) : Subscription {
    return this.http.patch<ProjectManager>(`project-managers/disable/${userId}`, { disabled: true }).subscribe(() => {
      this.users.set(userId, { ...this.users.get(userId)!, disabled: true })
      this.toastsService.addToast({
        type: "alert-error",
        message: `${this.users.get(userId)?.pseudo} désactivé`
      })
    });
  }

  enable(userId: number) : Subscription {
    return this.http.patch<ProjectManager>(`project-managers/enable/${userId}`, { disable: false }).subscribe(() => {
      this.users.set(userId, { ...this.users.get(userId)!, disabled: false })
      this.toastsService.addToast({
        type: "alert-success",
        message: `${this.users.get(userId)?.pseudo} activé`
      })
    });
  }

  changeAdmin(userId: number,admin: boolean) : Subscription {
    return this.http.patch<ProjectManager>(`project-managers/${userId}`, {admin}).subscribe(() => {
      this.users.set(userId, { ...this.users.get(userId)!, admin: admin})
      this.toastsService.addToast({
        type: admin ? "alert-success" : "alert-error",
        message: `${this.users.get(userId)?.pseudo} ${admin ? 'est maintenant admin' : 'n\'est plus admin'}`
      })
    });
  }

  changeStatsEnabled(userId: number, statsEnabled: boolean) : Subscription {
    return this.http.patch<ProjectManager>(`project-managers/${userId}`, {statsEnabled}).subscribe(() => {
      this.users.set(userId, { ...this.users.get(userId)!, statsEnabled: statsEnabled})
      this.toastsService.addToast({
        type: statsEnabled ? "alert-success" : "alert-error",
        message: `${this.users.get(userId)?.pseudo} ${statsEnabled ? 'apparaît maintenant dans les statistiques publiques' : 'n\'apparaît plus dans les statistiques publiques'}`
      })
    });
  }

  changeObjectived(userId: number, objectived: boolean) : Subscription {
    return this.http.patch<ProjectManager>(`project-managers/${userId}`, { objectived }).subscribe(() => {
      this.users.set(userId, { ...this.users.get(userId)!, objectived: objectived});
      this.authService.refreshUser();
      this.toastsService.addToast({
        type: objectived ? "alert-success" : "alert-error",
        message: `${this.users.get(userId)!.pseudo} ${objectived ? 'ajouté aux' : 'supprimé des'} objectifs`
      })
    });
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.http.patch<ProjectManager>(`project-managers/${id}`, updateUserDto).subscribe(() => {
      console.log("1")
      this.users.set(id, { ...this.users.get(id)!, ...updateUserDto });
      console.log("2")
      this.pmService.projectManagers.forEach(pm => {
        if(pm.id == id) {
          return { ...pm, updateUserDto }
        }
        return pm
      });
      console.log("3")
      const BreakError = {};
      try {
        
        this.pmService.pmGoals.forEach((goals, pm) => {
          if(pm.id == id) {
            const g = goals;
            this.pmService.pmGoals.delete(pm);
            this.pmService.pmGoals.set({ ...pm, ...updateUserDto }, g);
            throw BreakError 
          }
        });
      } catch (error) {
        if(error !== BreakError) { throw error }
      }
      console.log("4")

      this.toastsService.addToast({
        type: "alert-info",
        message: `Utilisateur ${this.users.get(id)!.pseudo} modifié`
      });
      console.log("5")
      this.authService.refreshUser();
      console.log("6")
    })
  }
}
