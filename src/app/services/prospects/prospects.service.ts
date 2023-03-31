import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs';
import { AuthService } from 'src/app/auth/auth.service';
import { EventDescriptionType } from 'src/app/constants/event-descriptions.type';
import { EventType } from 'src/app/constants/event.type';
import { ReasonDisabledType } from 'src/app/constants/reasonDisabled.type';
import { StageType } from 'src/app/constants/stage.type';
import { CreateMeetingDto } from 'src/app/dto/meetings/create-meeting.dto';
import { CreateProspectDto } from 'src/app/dto/prospects/create-prospect.dto';
import { UpdateProspectDto } from 'src/app/dto/prospects/update-prospects.dto';
import { CreateReminderDto } from 'src/app/dto/reminders/create-reminder.dto';
import { Prospect } from 'src/app/models/prospect.model';
import { ResearchParamsProspect } from 'src/app/models/research-params-prospect.model';
import { BookmarksService } from '../bookmarks/bookmarks.service';
import { EventsService } from '../events/events.service';
import { MeetingsService } from '../meetings/meetings.service';
import { RemindersService } from '../reminders/reminders.service';
import { SentEmailsService } from '../sent-emails/sent-emails.service';
import { StatisticsService } from '../statistics/statistics.service';
import { ToastsService } from '../toasts/toasts.service';

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
    private readonly toastsService: ToastsService,
    private readonly bookmarkService: BookmarksService,
    private readonly authService: AuthService,
    private readonly remindersService: RemindersService,
    private readonly sentEmailsService: SentEmailsService,
    private readonly meetingsService: MeetingsService,
    private readonly statisticsService: StatisticsService,
    private readonly eventsService: EventsService
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

  create(createProspectDto: CreateProspectDto, createReminderDto?: CreateReminderDto, createMeetingDto?: CreateMeetingDto) : Subscription {
    if(createProspectDto.stage == 5) {
      createProspectDto.archived = new Date();
    }
    return this.http.post<Prospect>(`prospects/create`, createProspectDto).subscribe(prospect => {
      this.prospects.set(prospect.id, prospect)

      // ! depending on which category the prospect is sent to 
      switch (createProspectDto.stage) {

        // ? research
        case 0:
          this.toastsService.addToast({
            type: "alert-success",
            message: `${createProspectDto.companyName} ajouté`
          });
        break;

        // ? bookmarks
        case 1:
          this.bookmarkService.create({
            creationDate: new Date(),
            prospect: prospect,
          });
        break;

        // ? reminder
        case 2:
          createReminderDto!.prospect = prospect
          this.remindersService.create(createReminderDto!)
          this.statisticsService.createCallForMe({
            prospect: prospect,
            date: new Date
          });
    
          this.statisticsService.createReminderForMe();
        break;

        // ? meeting
        case 3:
          createMeetingDto!.prospect = prospect;
          this.meetingsService.create(createMeetingDto!)
          this.statisticsService.createCallForMe({
            prospect: prospect,
            date: new Date
          });
          this.statisticsService.createMeetingForMe();

        break;

        // ? mail
        case 4:
          // 
          this.sentEmailsService.create({
            date: new Date,
            templateName: "",
            object: "",
            prospect: prospect,
            pm: this.authService.currentUserSubject.getValue(),
            sent: false,
          });

          this.statisticsService.createCallForMe({
            prospect: prospect,
            date: new Date
          });

          this.statisticsService.createSentEmailForMe();

        break;
      
        // ? refus
        case 5:
          this.eventsService.create({
            type: EventType.NEGATIVE_ANSWER,
            prospect: prospect,
            date: new Date,
            description: `${EventDescriptionType.NEGATIVE_ANSWER} ${this.authService.currentUserSubject.getValue().pseudo}`
          });

          this.statisticsService.createCallForMe({
            prospect: prospect,
            date: new Date
          });

          this.statisticsService.createNegativeAnswerForMe({
            prospect: prospect,
            date: new Date
          });

          this.toastsService.addToast({
            type: "alert-error",
            message: `Refus pris pris en compte`
          }); 
        break;
          
        default:
          break;
      }
      
    });
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
    this.http.get(`activities/adjustWeightNbNo/${this.prospects.get(idProspect)!.activity.id}`).subscribe();
    return this.http.patch<Prospect>(`prospects/${idProspect}`, nbNo).subscribe(() => this.prospects.set(idProspect, { ...this.prospects.get(idProspect)!, nbNo: nbNo.nbNo }));
  }

  updateIsBookmarked(idProspect: number, isBookmarked: { isBookmarked: boolean }) : Subscription {
    return this.http.patch<Prospect>(`prospects/${idProspect}`, isBookmarked).subscribe(() => {
      this.prospects.set(idProspect, { ...this.prospects.get(idProspect)!, isBookmarked: isBookmarked.isBookmarked })
    });
  }

  updateByCity(idProspect: number, cityName: string) : Subscription {
    return this.http.get<Prospect>(`prospects/by-city/${idProspect}/${cityName}`).subscribe();
  }

  updateByActivity(idProspect: number, activityName: string) : Subscription {
    return this.http.get<Prospect>(`prospects/by-activity/${idProspect}/${activityName}`).subscribe();
  }

  updateAllProspect(idProspect: number, updateProspectDto: UpdateProspectDto) : Subscription {
    return this.http.patch<Prospect>(`prospects/all-prospect/${idProspect}`, updateProspectDto).subscribe(() => {
      this.prospects.set(idProspect, { ...this.prospects.get(idProspect)!, ...updateProspectDto})
      this.toastsService.addToast({
        type: "alert-success",
        message: `${this.prospects.get(idProspect)?.companyName ?? 'Prospect'} mis à jour`
      })
    });
  }

  updateByStage(idProspect: number, stage: { stage: StageType }, prospect?: Prospect) : Subscription {
    if(stage.stage == StageType.ARCHIVED){
      return this.http.patch<Prospect>(`prospects/${idProspect}`, {stage: stage.stage, archived: new Date() }).subscribe(() => {
        this.prospects.set(idProspect, { ...this.prospects.get(idProspect)!, stage: stage.stage })
        this.toastsService.addToast({
          type: "alert-error",
          message: `Refus pris pris en compte`
        });
      });
    }
    else if (stage.stage == StageType.BOOKMARK){
      return this.http.patch<Prospect>(`prospects/${idProspect}`, stage).subscribe(() => this.prospects.set(idProspect, { ...this.prospects.get(idProspect)!, stage: stage.stage, isBookmarked: true }));  
    }
    else if (stage.stage == StageType.RESEARCH) {
      return this.http.patch<Prospect>(`prospects/${idProspect}`, stage).subscribe(() => this.prospects.set(idProspect, { ...prospect!, stage: stage.stage, isBookmarked: false }));  
    }
    return this.http.patch<Prospect>(`prospects/${idProspect}`, stage).subscribe(() => {
      this.prospects.set(idProspect, { ...this.prospects.get(idProspect)!, stage: stage.stage })

      stage.stage == StageType.PRO && this.toastsService.addToast({
        type: "alert-success",
        message: `Rendez-vous converti en PRO`
      });

      stage.stage == StageType.MEETING_DONE_AND_OUT && this.toastsService.addToast({
        type: "alert-success",
        message: `Rendez-vous effectué`
      });
    });
  }
  
  disable(idProspect: number, reason: ReasonDisabledType) : Subscription {
    return this.http.get<Prospect[]>(`prospects/disable/${idProspect}/${reason}`,).subscribe(() => {
      this.prospects.set(idProspect, { ...this.prospects.get(idProspect)!, stage: StageType.ARCHIVED, disabled: true })
      this.toastsService.addToast({
        type: "alert-error",
        message: `${this.prospects.get(idProspect)!.companyName} supprimé`
      })
    });
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
    // return this.http.get("prospects/add-events").subscribe();
  }
}
