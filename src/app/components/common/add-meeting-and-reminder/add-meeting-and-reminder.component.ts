import { Component, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AuthService } from 'src/app/auth/auth.service';
import { EventDescriptionType } from 'src/app/constants/event-descriptions.type';
import { EventType } from 'src/app/constants/event.type';
import { MeetingType } from 'src/app/constants/meeting.type';
import { StageType } from 'src/app/constants/stage.type';
import { CreateProspectDto } from 'src/app/dto/prospects/create-prospect.dto';
import { Prospect } from 'src/app/models/prospect.model';
import { Reminder } from 'src/app/models/reminder.model';
import { BookmarksService } from 'src/app/services/bookmarks/bookmarks.service';
import { EventsService } from 'src/app/services/events/events.service';
import { GoogleService } from 'src/app/services/google/google.service';
import { MeetingsService } from 'src/app/services/meetings/meetings.service';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';
import { RemindersService } from 'src/app/services/reminders/reminders.service';
import { SentEmailsService } from 'src/app/services/sent-emails/sent-emails.service';
import { StatisticsService } from 'src/app/services/statistics/statistics.service';
import { ToastsService } from 'src/app/services/toasts/toasts.service';

@Component({
  selector: 'app-add-meeting-and-reminder',
  templateUrl: './add-meeting-and-reminder.component.html',
  styleUrls: ['./add-meeting-and-reminder.component.scss']
})
export class AddMeetingAndReminderComponent implements OnInit {

  date: Date = new Date;

  // reminder
  reminderPriority: number = 1;
  reminderDescription: string = '';

  // meeting
  meetingTypeKeys = [MeetingType.EXT, MeetingType.MEETING_TABLE, MeetingType.TEL_VISIO];
  typeMeeting: MeetingType = MeetingType.EXT;

  
  data: {
    prospect?: Prospect;
    type?: string;
    reminder?: Reminder;
    createProspectDto?: CreateProspectDto;
  } = {}

  constructor(
    public readonly ngxSmartModalService: NgxSmartModalService,
    public readonly googleService: GoogleService,
    private readonly prospectsService: ProspectsService,
    private readonly remindersService: RemindersService,
    private readonly meetingsService: MeetingsService,
    private readonly bookmarksService: BookmarksService,
    private readonly sentEmailsService: SentEmailsService,
    private readonly statisticsService: StatisticsService,
    private readonly eventsService: EventsService,
    private readonly authService: AuthService,
    private readonly toastsService: ToastsService
  ) { }

  ngOnInit(): void {
    this.data = this.ngxSmartModalService.getModalData('add-meeting-reminder');
  }

  onMeeting() {
    if(this.data.prospect) {
      this.data.prospect!.stage == 2 && this.onMarkReminderDone();

    // count as a call
    (this.data.prospect!.stage == 0 || this.data.prospect!.stage == 1) && this.statisticsService.createCallForMe({
      prospect: this.data.prospect!,
      date: new Date
    });

    // Incrementing the meetings count
    this.statisticsService.createMeetingForMe();

    this.prospectsService.updateByStage(this.data.prospect!.id, { stage: StageType.MEETING });
    this.remindersService.updateByStage(this.data.prospect!.id, { stage: StageType.MEETING });
    this.meetingsService.updateByStage(this.data.prospect!.id, { stage: StageType.MEETING });
    this.bookmarksService.updateByStage(this.data.prospect!.id, { stage: StageType.MEETING });
    this.sentEmailsService.updateByStage(this.data.prospect!.id, { stage: StageType.MEETING });
    
    this.meetingsService.create({
      type: this.typeMeeting,
      date: this.date,
      done: false,
      prospect: this.data.prospect!,
      creationDate: new Date
    });

    } else if (this.data.createProspectDto) {
      this.prospectsService.create(
        this.data.createProspectDto!,
        undefined,
        {
          type: this.typeMeeting,
          date: this.date,
          done: false,
          prospect: this.data.prospect!,
          creationDate: new Date
        }
      )
    }
  
  this.closeModal()
  }

  onGoogle() {
    this.toastsService.addToast({
      type: "alert-error", 
      message: "Connexion à google requise"
    })
    this.googleService.authenticate()
  }

  onReminder() {

    if (this.data.prospect) {
      // Counting as a call
      (this.data.prospect!.stage == 0 || this.data.prospect!.stage == 1) && this.statisticsService.createCallForMe({
        prospect: this.data.prospect!,
        date: new Date
      });

      // Incremeting the reminders
      (this.data.prospect!.stage == 0 || this.data.prospect!.stage == 1) && this.statisticsService.createReminderForMe();

      this.prospectsService.updateByStage(this.data.prospect!.id, { stage: StageType.REMINDER });
      this.remindersService.updateByStage(this.data.prospect!.id, { stage: StageType.REMINDER });
      this.meetingsService.updateByStage(this.data.prospect!.id, { stage: StageType.REMINDER });
      this.bookmarksService.updateByStage(this.data.prospect!.id, { stage: StageType.REMINDER });
      this.sentEmailsService.updateByStage(this.data.prospect!.id, { stage: StageType.REMINDER });

      this.remindersService.create({
        date: this.date,
        priority: this.reminderPriority,
        done: false,
        description: this.reminderDescription,
        prospect: this.data.prospect!,
        creationDate: new Date
      });

      
    } else if (this.data.createProspectDto) {

      this.prospectsService.create(
        this.data.createProspectDto!,
        {
          date: this.date,
          priority: this.reminderPriority,
          done: false,
          description: this.reminderDescription,
          prospect: {} as Prospect,
          creationDate: new Date
        },
        undefined
        )
    }
    this.closeModal()
  }


  onMarkReminderDone() {
    console.log("reminder marked done");
    this.eventsService.create({
      type: EventType.DONE_REMINDER,
      prospect: this.data.reminder!.prospect,
      date: new Date,
      description: `${EventDescriptionType.DONE_REMINDER} ${this.authService.currentUserSubject.getValue().pseudo}`
    });
    return this.remindersService.markDone(this.data.reminder!.id);
  }

  closeModal() {
    this.ngxSmartModalService.closeAll();
  }
}
