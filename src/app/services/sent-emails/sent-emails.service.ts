import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { EventDescriptionType } from 'src/app/constants/event-descriptions.type';
import { EventType } from 'src/app/constants/event.type';
import { StageType } from 'src/app/constants/stage.type';
import { CreateSentEmailDto } from 'src/app/dto/sent-emails/create-sent-emails.dto';
import { SendEmailDto } from 'src/app/dto/sent-emails/send-email.dto';
import { Prospect } from 'src/app/models/prospect.model';
import { ResearchParamsSentEmails } from 'src/app/models/research-params-sent-emails.model';
import { SentEmail } from 'src/app/models/sent-email.model';
import { EventsService } from '../events/events.service';
import { ToastsService } from '../toasts/toasts.service';

@Injectable({
  providedIn: 'root'
})
export class SentEmailsService {

  loading: boolean = true;


  nbSentEmails: number = 0;
  nbSentEmailsSent: number = 0;

  sentEmails = new Map<number, SentEmail>();
  sentEmailsSent = new Map<number, SentEmail>();
  researchParamsSentEmails : ResearchParamsSentEmails = {
    take: 20,
    skip: 0,
    sent: 0,
    keyword: null
  };

  constructor(
    private http: HttpClient,
    private readonly toastsService: ToastsService,
    private readonly eventsService: EventsService,
    private readonly authService: AuthService
  ) { 
    this.loadMore();
    // this.loadMoreSent();
  }

  // ! sent emails not Sent yet

  resetSearch(researchParamsSentEmails: ResearchParamsSentEmails) {
    this.loading = true;
    this.researchParamsSentEmails.sent == 1 ? this.sentEmailsSent.clear() : this.sentEmails.clear();
    this.updateSearchParameters({
      ...researchParamsSentEmails,
      skip: 0,
      take: 20
    });
  }

  updateSearchParameters(researchParamsSentEmails: ResearchParamsSentEmails) {
    this.loading = true;
    if(researchParamsSentEmails != this.researchParamsSentEmails)
      this.researchParamsSentEmails = researchParamsSentEmails;
      this.loadMore();
  }

  loadMore() {
    let queryParameters = new HttpParams();
    this.researchParamsSentEmails.keyword && (queryParameters = queryParameters.append('keyword', this.researchParamsSentEmails.keyword));
    queryParameters = queryParameters.append("skip", this.researchParamsSentEmails.skip);
    queryParameters = queryParameters.append("sent", this.researchParamsSentEmails.sent)
    queryParameters = queryParameters.append("take", 20);
    this.http.get<{sentEmails: SentEmail[], count: number}>(`sent-emails/find-all-paginated`, { params: queryParameters }).subscribe(data => {
      if(this.researchParamsSentEmails.sent == 1) {
        data.sentEmails.forEach(sentEmail => this.sentEmailsSent.set(sentEmail.id, sentEmail));
        this.nbSentEmailsSent = data.count;
      } else {
        data.sentEmails.forEach(sentEmail => this.sentEmails.set(sentEmail.id, sentEmail));
        this.nbSentEmails = data.count;
      }
      this.loading = false;
    });
  }
  
  create(createSentEmailDto: CreateSentEmailDto) {
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


  createAndSend(createSentEmailDto: CreateSentEmailDto, sendEmailDto: SendEmailDto) {
    return this.http.post<SentEmail>(`sent-emails/create-and-send`, {  createSentEmailDto: createSentEmailDto, sendEmailDto: sendEmailDto }).subscribe(sentEmail => {
      this.sentEmailsSent.set(sentEmail.id, sentEmail)

      this.nbSentEmailsSent += 1;
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

      sentEmail.id != -1 && this.sentEmailsSent.set(sentEmail.id, { ...this.sentEmailsSent.get(sentEmail.id)!, sent: true});
      sentEmail.id != -1 && (this.nbSentEmailsSent += 1);
      sentEmail.id != -1 && this.toastsService.addToast({
        type: "alert-success",
        message: `Mail envoyé à ${this.sentEmailsSent.get(sentEmail.id)!.prospect.companyName}`
      })

      sentEmail.id == -1 && this.toastsService.addToast({
        type: "alert-success",
        message: `Mail test envoyé`
      });

    })
  }

  createAndSendSeparately(createSentEmailDto: CreateSentEmailDto, object: string) {
    return this.http.post<SentEmail>(`sent-emails/create-and-send-separately`, { createSentEmailDto: createSentEmailDto, object: object}).subscribe(sentEmail => {
      this.sentEmailsSent.set(sentEmail.id, sentEmail)
      this.nbSentEmailsSent += 1;
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
      this.sentEmailsSent.set(sentEmail.id, { ...this.sentEmailsSent.get(sentEmail.id)!, sent: true});

      this.toastsService.addToast({
        type: "alert-success",
        message: `Mail envoyé à ${this.sentEmailsSent.get(sentEmail.id)!.prospect.companyName}`
      })
    })
  }

  send(sendEmailDto: SendEmailDto, idSentEmail: number) {
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

  updateCommentProspect(id: number, newComment: string) {
    this.sentEmails.forEach(sentEmail => {
      if(sentEmail.prospect.id == id) {
        return sentEmail.prospect.comment = newComment
      }
      return
    })
  }

}
