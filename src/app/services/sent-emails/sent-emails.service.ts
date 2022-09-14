import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { StageType } from 'src/app/constants/stage.type';
import { CreateSentEmailDto } from 'src/app/dto/sent-emails/create-sent-emails.dto';
import { ResearchParamsSentEmails } from 'src/app/models/research-params-sent-emails.model';
import { SentEmail } from 'src/app/models/sent-email.model';

@Injectable({
  providedIn: 'root'
})
export class SentEmailsService {

  sentEmails = new Map<number, SentEmail>();
  researchParamsSentEmails : ResearchParamsSentEmails = {
    take: 20,
    skip: 0
  };

  constructor(
    private http: HttpClient
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
    this.http.get<SentEmail[]>(`sent-emails/find-all-paginated`, { params: queryParameters }).subscribe(sentEmails => sentEmails.forEach(sentEmail => this.sentEmails.set(sentEmail.id, sentEmail)));
  }

  create(createSentEmailDto: CreateSentEmailDto) : Subscription {
    return this.http.post<SentEmail>(`sent-emails`, createSentEmailDto).subscribe(sentEmail => {
     
    })
  }

}
