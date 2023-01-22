import { Component, Input, OnInit } from '@angular/core';
import { StageType } from 'src/app/constants/stage.type';
import { CreateProspectDto } from 'src/app/dto/prospects/create-prospect.dto';
import { Prospect } from 'src/app/models/prospect.model';
import { BookmarksService } from 'src/app/services/bookmarks/bookmarks.service';
import { MeetingsService } from 'src/app/services/meetings/meetings.service';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';
import { RemindersService } from 'src/app/services/reminders/reminders.service';
import { SentEmailsService } from 'src/app/services/sent-emails/sent-emails.service';
import { StatisticsService } from 'src/app/services/statistics/statistics.service';

@Component({
  selector: 'app-add-reminder-modal',
  templateUrl: './add-reminder-modal.component.html',
  styleUrls: ['./add-reminder-modal.component.scss']
})
export class AddReminderModalComponent implements OnInit {

  @Input() prospect!: Prospect;
  @Input() createProspectDto!: CreateProspectDto;

  date!: Date;
  priority: number = 1;
  description: string = "";

  constructor(
    private readonly remindersService: RemindersService,
    private readonly prospectService: ProspectsService,
    private readonly meetingsService: MeetingsService,
    private readonly bookmarksService: BookmarksService,
    private readonly sentEmailsService: SentEmailsService,
    private readonly statisticsService: StatisticsService,
  ) { }

  ngOnInit(): void {
  }

  onCreateReminder() {

    if (this.prospect) {
      // Counting as a call
      (this.prospect.stage == 0 || this.prospect.stage == 1) && this.statisticsService.createCallForMe({
        prospect: this.prospect,
        date: new Date
      });

      // Incremeting the reminders
      (this.prospect.stage == 0 || this.prospect.stage == 1) && this.statisticsService.createReminderForMe();

      this.prospectService.updateByStage(this.prospect.id, { stage: StageType.REMINDER });
      this.remindersService.updateByStage(this.prospect.id, { stage: StageType.REMINDER });
      this.meetingsService.updateByStage(this.prospect.id, { stage: StageType.REMINDER });
      this.bookmarksService.updateByStage(this.prospect.id, { stage: StageType.REMINDER });
      this.sentEmailsService.updateByStage(this.prospect.id, { stage: StageType.REMINDER });

      this.remindersService.create({
        date: this.date,
        priority: this.priority,
        done: false,
        description: this.description,
        prospect: this.prospect,
        creationDate: new Date
      });

      
    } else if (this.createProspectDto) {

      this.prospectService.create(
        this.createProspectDto,
        {
          date: this.date,
          priority: this.priority,
          done: false,
          description: this.description,
          prospect: {} as Prospect,
          creationDate: new Date
        },
        undefined
        )
    }
  }
}
