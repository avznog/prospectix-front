import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { EventDescriptionType } from 'src/app/constants/event-descriptions.type';
import { EventType } from 'src/app/constants/event.type';
import { StageType } from 'src/app/constants/stage.type';
import { CreateSentEmailDto } from 'src/app/dto/sent-emails/create-sent-emails.dto';
import { sendEmailDto } from 'src/app/dto/sent-emails/send-email.dto';
import { Prospect } from 'src/app/models/prospect.model';
import { ResearchParamsSentEmails } from 'src/app/models/research-params-sent-emails.model';
import { SentEmail } from 'src/app/models/sent-email.model';
import { EventsService } from '../events/events.service';
import { ToastsService } from '../toasts/toasts.service';

@Injectable({
  providedIn: 'root'
})
export class SentEmailsService {

  nbSentEmails: number = 0;
  nbSentEmailsSent: number = 0;
  sentEmails = new Map<number, SentEmail>();
  sentEmailsSent = new Map<number, SentEmail>();
  researchParamsSentEmails : ResearchParamsSentEmails = {
    take: 20,
    skip: 0,
    sent: false,
  };

  constructor(
    private http: HttpClient,
    private readonly toastsService: ToastsService,
    private readonly eventsService: EventsService,
    private readonly authService: AuthService
  ) { 
    this.loadMore();
    this.loadMoreSent();
    this.countSentEmails()
    this.countSentEmailsSent()
  }

  // ! sent emails not Sent yet

  resetSearch(researchParamsSentEmails: ResearchParamsSentEmails) {
    this.researchParamsSentEmails.sent ? this.sentEmailsSent.clear() : this.sentEmails.clear()
    this.updateSearchParameters({
      ...researchParamsSentEmails,
      skip: 0,
      take: 20
    });
  }

  updateSearchParameters(researchParamsSentEmails: ResearchParamsSentEmails) {
    if(researchParamsSentEmails != this.researchParamsSentEmails)
      this.researchParamsSentEmails = researchParamsSentEmails;
      this.researchParamsSentEmails.sent ? this.loadMoreSent() : this.loadMore();
    
  }

  loadMore() {
    let queryParameters = new HttpParams();
    queryParameters = queryParameters.append("skip", this.researchParamsSentEmails.skip);
    queryParameters = queryParameters.append("take", 20);
    queryParameters = queryParameters.append("sent", this.researchParamsSentEmails.sent)
    this.http.get<SentEmail[]>(`sent-emails/find-all-paginated`, { params: queryParameters }).subscribe(sentEmails => {
      sentEmails.forEach(sentEmail => this.sentEmails.set(sentEmail.id, sentEmail))
      this.countSentEmails()
    });
  }

  // ! sent emails SENT

  loadMoreSent() {
    let queryParameters = new HttpParams();
    queryParameters = queryParameters.append("skip", this.researchParamsSentEmails.skip)
    queryParameters = queryParameters.append("take", 20),
    queryParameters = queryParameters.append("sent", this.researchParamsSentEmails.sent)
    this.http.get<SentEmail[]>(`sent-emails/find-all-paginated-sent`, { params: queryParameters }).subscribe(sentEmailsSent => {
      sentEmailsSent.forEach(sentEmailSent => this.sentEmailsSent.set(sentEmailSent.id, sentEmailSent));
      this.countSentEmailsSent();
    })
  }
  
  create(createSentEmailDto: CreateSentEmailDto) : Subscription {
    return this.http.post<SentEmail>(`sent-emails`, createSentEmailDto).subscribe(sentEmail => {
      this.sentEmails.set(sentEmail.id, { ...sentEmail, prospect: { ...sentEmail.prospect, stage: StageType.MAIL}})
      this.nbSentEmails += 1;
      this.toastsService.addToast({
        type: "alert-success",
        message: `${sentEmail.prospect.companyName} ajouté aux mails`
      });

      this.eventsService.create({
        type: EventType.ADD_SENT_EMAIL,
        date: new Date,
        description: `${EventDescriptionType.ADD_SENT_EMAIL} ${this.authService.currentUserSubject.getValue().pseudo}`,
        pm: this.authService.currentUserSubject.getValue(),
        prospect: sentEmail.prospect
      });
    })
  }

  send(sendEmailDto: sendEmailDto, idSentEmail: number) {
    return this.http.post(`sent-emails/send/${idSentEmail}`, sendEmailDto).subscribe(() => {
      idSentEmail != -1 && this.sentEmails.set(idSentEmail, { ...this.sentEmails.get(idSentEmail)!, sent: true});
      idSentEmail != -1 && this.sentEmailsSent.set(idSentEmail, { ...this.sentEmails.get(idSentEmail)!, sent: true});
      idSentEmail != -1 && (this.nbSentEmailsSent += 1);
      idSentEmail != -1 && (this.nbSentEmails -= 1);

      idSentEmail != -1 && this.toastsService.addToast({
        type: "alert-success",
        message: `Mail envoyé à ${this.sentEmailsSent.get(idSentEmail)!.prospect.companyName}`
      })

      idSentEmail == -1 && this.toastsService.addToast({
        type: "alert-success",
        message: `Mail test envoyé`
      })
    })
  }

  sendSeparately(idSentEmail: number, object: string) {
    return this.http.post(`sent-emails/send-separately/${idSentEmail}`, { object: object }).subscribe(() => {
      this.sentEmails.set(idSentEmail, { ...this.sentEmails.get(idSentEmail)!, sent: true})
      this.sentEmailsSent.set(idSentEmail, { ...this.sentEmails.get(idSentEmail)!, sent: true});
      this.nbSentEmailsSent += 1;
      this.nbSentEmails -= 1;

      this.toastsService.addToast({
        type: "alert-success",
        message: `Mail envoyé à ${this.sentEmailsSent.get(idSentEmail)!.prospect.companyName}`
      })
    })
  }

  updateByStage(idProspect: number, stage: { stage: StageType }) {
    this.sentEmails.forEach(sentEmail => {
      if(sentEmail.prospect.id == idProspect)
        return sentEmail.prospect.stage = stage.stage
      return sentEmail
    });

    this.sentEmailsSent.forEach(sentEmailSent => {
      if(sentEmailSent.prospect.id == idProspect) {
        return sentEmailSent.prospect.stage = stage.stage
      }
      return sentEmailSent
    })
  }

  updateLiveProspect(prospect: Prospect) {
    this.sentEmails.forEach(sentEmail => {
      if(sentEmail.prospect.id == prospect.id)
        return sentEmail.prospect = prospect
      return
    })
  }

  countSentEmails() {
    let queryParameters = new HttpParams();
    queryParameters = queryParameters.append("skip", this.researchParamsSentEmails.skip);
    queryParameters = queryParameters.append("take", 20);
    queryParameters = queryParameters.append("sent", this.researchParamsSentEmails.sent)
    return this.http.get<number>(`sent-emails/count-sent-emails`, { params: queryParameters }).subscribe(nbSentEmails => {
      this.nbSentEmails = nbSentEmails
    });
  }

  countSentEmailsSent() {
    let queryParameters = new HttpParams();
    queryParameters = queryParameters.append("skip", this.researchParamsSentEmails.skip)
    queryParameters = queryParameters.append("take", 20),
    queryParameters = queryParameters.append("sent", this.researchParamsSentEmails.sent)
    return this.http.get<number>(`sent-emails/count-sent-emails-sent`, { params: queryParameters }).subscribe(nbSentEmailsSent => this.nbSentEmailsSent = nbSentEmailsSent);
  }

  updateCommentProspect(id: number, newComment: string) {
    this.sentEmails.forEach(sentEmail => {
      if(sentEmail.prospect.id == id) {
        return sentEmail.prospect.comment = newComment
      }
      return
    })
  }

}
