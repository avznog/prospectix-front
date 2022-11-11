import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { StageType } from 'src/app/constants/stage.type';
import { CreateSentEmailDto } from 'src/app/dto/sent-emails/create-sent-emails.dto';
import { Prospect } from 'src/app/models/prospect.model';
import { ResearchParamsSentEmails } from 'src/app/models/research-params-sent-emails.model';
import { SentEmail } from 'src/app/models/sent-email.model';
import { ToastsService } from '../toasts/toasts.service';

@Injectable({
  providedIn: 'root'
})
export class SentEmailsService {

  nbSentEmails: number = 0;
  sentEmails = new Map<number, SentEmail>();
  researchParamsSentEmails : ResearchParamsSentEmails = {
    take: 20,
    skip: 0
  };

  constructor(
    private http: HttpClient,
    private readonly toastsService: ToastsService
  ) { 
    this.loadMore();
  }

  reseatSearch(researchParamsSentEmails: ResearchParamsSentEmails) {
    this.sentEmails.clear();
    this.updateSearchParameters({
      ...researchParamsSentEmails,
      skip: 0
    });
  }

  updateSearchParameters(researchParamsSentEmails: ResearchParamsSentEmails) {
    if(researchParamsSentEmails != this.researchParamsSentEmails)
      this.researchParamsSentEmails = researchParamsSentEmails;
      this.loadMore();
  }

  loadMore() {
    let queryParameters = new HttpParams();
    queryParameters = queryParameters.append("skip", this.researchParamsSentEmails.skip);
    queryParameters = queryParameters.append("take", 20);
    this.http.get<SentEmail[]>(`sent-emails/find-all-paginated`, { params: queryParameters }).subscribe(sentEmails => {
      sentEmails.forEach(sentEmail => this.sentEmails.set(sentEmail.id, sentEmail))
      this.countSentEmails()
    });
  }

  create(createSentEmailDto: CreateSentEmailDto) : Subscription {
    return this.http.post<SentEmail>(`sent-emails`, createSentEmailDto).subscribe(sentEmail => {
      this.sentEmails.set(sentEmail.id, { ...sentEmail, prospect: { ...sentEmail.prospect, stage: StageType.MAIL}})
      this.nbSentEmails += 1;
      this.toastsService.addToast({
        type: "alert-success",
        message: `Mail envoyé à ${createSentEmailDto.prospect.companyName}`
      });
    })
  }

  updateByStage(idProspect: number, stage: { stage: StageType }) {
    this.sentEmails.forEach(sentEmail => {
      if(sentEmail.prospect.id == idProspect)
        return sentEmail.prospect.stage = stage.stage
      return sentEmail
    });
  }

  updateLiveProspect(prospect: Prospect) {
    this.sentEmails.forEach(sentEmail => {
      if(sentEmail.prospect.id == prospect.id)
        return sentEmail.prospect = prospect
      return
    })
  }

  countSentEmails() {
    return this.http.get<number>(`sent-emails/count-sent-emails`).subscribe(nbSentEmails => this.nbSentEmails = nbSentEmails);
  }

}
