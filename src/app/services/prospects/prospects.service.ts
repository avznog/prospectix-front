import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { ReasonDisabledType } from 'src/app/constants/reasonDisabled.type';
import { StageType } from 'src/app/constants/stage.type';
import { CreateProspectDto } from 'src/app/dto/prospects/create-prospect.dto';
import { UpdateProspectDto } from 'src/app/dto/prospects/update-prospects.dto';
import { Prospect } from 'src/app/models/prospect.model';
import { ResearchParamsProspect } from 'src/app/models/research-params-prospect.model';

@Injectable({
  providedIn: 'root'
})
export class ProspectsService {

  prospects = new Map<number, Prospect>();
  nbProspects: number = 0;
  researchParamsProspect : ResearchParamsProspect = {
    skip: 0,
    zipcode: -1000,
    activity: "allActivities",
    keyword: ""
  };

  constructor(
    private http: HttpClient,
  ) { 
    this.loadMore();
  }

  resetSearch(researchParamsProspect: ResearchParamsProspect) {
    this.prospects.clear();
    this.updateSearchParameters({
      ...researchParamsProspect,
      skip: 0
    });
  }

  updateSearchParameters(researchParamsProspect: ResearchParamsProspect) {
    if(researchParamsProspect != this.researchParamsProspect)
      this.researchParamsProspect = researchParamsProspect;
      this.loadMore();
  }

  loadMore() {
    let queryParameters = new HttpParams();
      if(this.researchParamsProspect.activity)
        queryParameters = queryParameters.append("activity", this.researchParamsProspect.activity)
      
      if(this.researchParamsProspect.skip)
        queryParameters = queryParameters.append("skip", this.researchParamsProspect.skip)
      
      queryParameters = queryParameters.append("keyword", this.researchParamsProspect.keyword ?? "")
      queryParameters = queryParameters.append("take", 20);
      queryParameters = queryParameters.append("zipcode", this.researchParamsProspect.zipcode)
      this.http.get<Prospect[]>(`prospects/find-all-paginated/`, { params: queryParameters }).subscribe(prospects => prospects.forEach(prospect => this.prospects.set(prospect.id, prospect)));
      this.countProspects();
  }

  create(createProspectDto: CreateProspectDto) : Subscription {
    return this.http.post<Prospect>(`prospects/create`, createProspectDto).subscribe(prospect => this.prospects.set(prospect.id, prospect));
  }

  updateStreetAddress(idProspect: number, streetAddress: { streetAddress: string }) {
    return this.http.patch<Prospect>(`prospects/${idProspect}`, streetAddress).subscribe(() => this.prospects.set(idProspect, { ...this.prospects.get(idProspect)!, streetAddress: streetAddress.streetAddress}))
  }

  updateCompanyName(idProspect: number, companyName: { companyName: string }) {
    return this.http.patch<Prospect>(`prospects/${idProspect}`, companyName).subscribe(() => this.prospects.set(idProspect, { ...this.prospects.get(idProspect)!, companyName: companyName.companyName}));
  }

  updateComment(idProspect: number, comment: { comment: string }) : Subscription {
    return this.http.patch<Prospect>(`prospects/${idProspect}`, comment).subscribe(() => this.prospects.set(idProspect, { ...this.prospects.get(idProspect)!, comment: comment.comment }));
  }

  updateNbNo(idProspect: number, nbNo: { nbNo: number }) : Subscription {
    return this.http.patch<Prospect>(`prospects/${idProspect}`, nbNo).subscribe(() => this.prospects.set(idProspect, { ...this.prospects.get(idProspect)!, nbNo: nbNo.nbNo }));
  }

  updateIsBookmarked(idProspect: number, isBookmarked: { isBookmarked: boolean }) : Subscription {
    return this.http.patch<Prospect>(`prospects/${idProspect}`, isBookmarked).subscribe(() => this.prospects.set(idProspect, { ...this.prospects.get(idProspect)!, isBookmarked: isBookmarked.isBookmarked }));
  }

  updateByCity(idProspect: number, cityName: string) : Subscription {
    return this.http.get<Prospect>(`prospects/by-city/${idProspect}/${cityName}`).subscribe();
  }

  updateByActivity(idProspect: number, activityName: string) : Subscription {
    return this.http.get<Prospect>(`prospects/by-activity/${idProspect}/${activityName}`).subscribe();
  }

  updateAllProspect(idProspect: number, updateProspectDto: UpdateProspectDto) : Subscription {
    return this.http.patch<Prospect>(`prospects/all-prospect/${idProspect}`, updateProspectDto).subscribe(() => this.prospects.set(idProspect, { ...this.prospects.get(idProspect)!, ...updateProspectDto}));
  }

  updateByStage(idProspect: number, stage: { stage: StageType }, prospect?: Prospect) : Subscription {
    if(stage.stage == StageType.ARCHIVED){
      return this.http.patch<Prospect>(`prospects/${idProspect}`, {stage: stage.stage, archived: new Date() }).subscribe(() => this.prospects.set(idProspect, { ...this.prospects.get(idProspect)!, stage: stage.stage }));
    }
    else if (stage.stage == StageType.BOOKMARK){
      return this.http.patch<Prospect>(`prospects/${idProspect}`, stage).subscribe(() => this.prospects.set(idProspect, { ...this.prospects.get(idProspect)!, stage: stage.stage, isBookmarked: true }));  
    }
    else if (stage.stage == StageType.RESEARCH) {
      console.log(this.prospects.get(idProspect))
      console.log(prospect)
      return this.http.patch<Prospect>(`prospects/${idProspect}`, stage).subscribe(() => this.prospects.set(idProspect, { ...prospect!, stage: stage.stage, isBookmarked: false }));  
    }
    return this.http.patch<Prospect>(`prospects/${idProspect}`, stage).subscribe(() => this.prospects.set(idProspect, { ...this.prospects.get(idProspect)!, stage: stage.stage }));
  }
  
  disable(idProspect: number, reason: ReasonDisabledType) : Subscription {
    return this.http.get<Prospect[]>(`prospects/disable/${idProspect}/${reason}`,).subscribe(() => this.prospects.set(idProspect, { ...this.prospects.get(idProspect)!, stage: StageType.ARCHIVED, disabled: true }));
  }

  countProspects() {
    let queryParameters = new HttpParams();
    if(this.researchParamsProspect.activity)
      queryParameters = queryParameters.append("activity", this.researchParamsProspect.activity)
    
    if(this.researchParamsProspect.skip)
      queryParameters = queryParameters.append("skip", this.researchParamsProspect.skip)
    
    queryParameters = queryParameters.append("keyword", this.researchParamsProspect.keyword ?? "")
    queryParameters = queryParameters.append("take", 20);
    queryParameters = queryParameters.append("zipcode", this.researchParamsProspect.zipcode);
    return this.http.get<number>(`prospects/count-prospects`, { params: queryParameters }).subscribe(nbProspects => this.nbProspects = nbProspects);
  }

  addProspectsBase() {
    // return this.http.get("prospects/create-from-scrapper").subscribe();
  }

  addEvents() {
    return this.http.get("prospects/add-events").subscribe();
  }
}
