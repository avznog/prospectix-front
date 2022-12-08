import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { EventDescriptionType } from 'src/app/constants/event-descriptions.type';
import { EventType } from 'src/app/constants/event.type';
import { StageType } from 'src/app/constants/stage.type';
import { Meeting } from 'src/app/models/meeting.model';
import { Prospect } from 'src/app/models/prospect.model';
import { BookmarksService } from 'src/app/services/bookmarks/bookmarks.service';
import { EventsService } from 'src/app/services/events/events.service';
import { MeetingsService } from 'src/app/services/meetings/meetings.service';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';
import { RemindersService } from 'src/app/services/reminders/reminders.service';
import { SentEmailsService } from 'src/app/services/sent-emails/sent-emails.service';

@Component({
  selector: 'app-mark-meeting-done-and-out',
  templateUrl: './mark-meeting-done-and-out.component.html',
  styleUrls: ['./mark-meeting-done-and-out.component.scss']
})
export class MarkMeetingDoneAndOutComponent implements OnInit {

  @Input() prospect!: Prospect;
  @Input() meeting!: Meeting;
  constructor(
    private readonly prospectService: ProspectsService,
    private readonly remindersService: RemindersService,
    private readonly meetingsService: MeetingsService,
    private readonly bookmarksService: BookmarksService,
    private readonly sentEmailsService: SentEmailsService,
    private readonly eventsService: EventsService,
    private readonly authService: AuthService,
  ) { }

  ngOnInit(): void {
   
  }

  onClickMeetingDoneAndOut() {
    this.prospect.stage == 3 && this.onMarkMeetingDone();

    this.prospectService.updateByStage(this.prospect.id, { stage: StageType.MEETING_DONE_AND_OUT });
    this.remindersService.updateByStage(this.prospect.id, { stage: StageType.MEETING_DONE_AND_OUT });
    this.meetingsService.updateByStage(this.prospect.id, { stage: StageType.MEETING_DONE_AND_OUT });
    this.bookmarksService.updateByStage(this.prospect.id, { stage: StageType.MEETING_DONE_AND_OUT });
    this.sentEmailsService.updateByStage(this.prospect.id, { stage: StageType.MEETING_DONE_AND_OUT });

    this.eventsService.create({
      type: EventType.DONE_MEETING,
      date: new Date,
      description: EventDescriptionType.DONE_MEETING,
      pm: this.authService.currentUserSubject.getValue(),
      prospect: this.prospect
    });
  }

  onMarkMeetingDone() {
    console.log("meeting marked done");
    this.eventsService.create({
      type: EventType.DONE_MEETING,
      prospect: this.meeting.prospect,
      date: new Date,
      description: `${EventDescriptionType.DONE_MEETING} ${this.authService.currentUserSubject.getValue().pseudo}`
    });
    return this.meetingsService.markDone(this.meeting.id);
  }
}
