import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { EventDescriptionType } from 'src/app/constants/event-descriptions.type';
import { EventType } from 'src/app/constants/event.type';
import { MeetingType } from 'src/app/constants/meeting.type';
import { StageType } from 'src/app/constants/stage.type';
import { Prospect } from 'src/app/models/prospect.model';
import { EventsService } from 'src/app/services/events/events.service';
import { MeetingsService } from 'src/app/services/meetings/meetings.service';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';
import { RemindersService } from 'src/app/services/reminders/reminders.service';

@Component({
  selector: 'app-add-meetings-modal',
  templateUrl: './add-meetings-modal.component.html',
  styleUrls: ['./add-meetings-modal.component.scss']
})
export class AddMeetingsModalComponent implements OnInit {

  date: Date = new Date;
  type: MeetingType = MeetingType.EXT;
  
  meetingTypeKeys = [MeetingType.EXT, MeetingType.MEETING_TABLE, MeetingType.TEL_VISIO];
  @Input() prospect!: Prospect;
  

  constructor(
    private readonly meetingsService: MeetingsService,
    private readonly eventsService: EventsService,
    private readonly authService: AuthService,
    private readonly prospectsService: ProspectsService,
    private readonly remindersService: RemindersService
  ) { }

  ngOnInit(): void {
  }

  onCreateMeeting() {
    this.prospectsService.updateByStage(this.prospect.id, { stage: StageType.MEETING });
    this.prospect.reminders.forEach(reminder => this.remindersService.deleteReminder(reminder.id));
    this.meetingsService.create({
      type: this.type,
      date: this.date,
      done: false,
      prospect: this.prospect,
    });

    this.eventsService.create({
      type: EventType.ADD_MEETING,
      prospect: this.prospect,
      date: new Date,
      description: `${EventDescriptionType.ADD_MEETING} ${this.authService.currentUserSubject.getValue().pseudo}`
    });

    
    console.log("meeting created !");
  }
}
