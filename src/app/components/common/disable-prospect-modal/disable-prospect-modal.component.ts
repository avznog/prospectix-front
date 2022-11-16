import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { EventDescriptionType } from 'src/app/constants/event-descriptions.type';
import { EventType } from 'src/app/constants/event.type';
import { ReasonDisabledType } from 'src/app/constants/reasonDisabled.type';
import { StageType } from 'src/app/constants/stage.type';
import { Bookmark } from 'src/app/models/bookmark.model';
import { Prospect } from 'src/app/models/prospect.model';
import { BookmarksService } from 'src/app/services/bookmarks/bookmarks.service';
import { EventsService } from 'src/app/services/events/events.service';
import { MeetingsService } from 'src/app/services/meetings/meetings.service';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';
import { RemindersService } from 'src/app/services/reminders/reminders.service';
import { SentEmailsService } from 'src/app/services/sent-emails/sent-emails.service';
import { ToastsService } from 'src/app/services/toasts/toasts.service';

@Component({
  selector: 'app-disable-prospect-modal',
  templateUrl: './disable-prospect-modal.component.html',
  styleUrls: ['./disable-prospect-modal.component.scss']
})
export class DisableProspectModalComponent implements OnInit {

  @Input() prospect!: Prospect;
  @Input() bookmark!: Bookmark;

  reasonDisabledType = [ReasonDisabledType.ENTREPRISE_FERMEE, ReasonDisabledType.GRAND_GROUPE, ReasonDisabledType.MAL_ATTRIBUE, ReasonDisabledType.HOLDINGS];
  reason: ReasonDisabledType = ReasonDisabledType.MAL_ATTRIBUE;

  constructor(
    private readonly prospectService: ProspectsService,
    private readonly toastsService: ToastsService,
    public readonly bookmarksService: BookmarksService,
    private readonly eventsService: EventsService,
    public readonly authService: AuthService,
    private readonly meetingsService: MeetingsService,
    private readonly remindersService: RemindersService,
    private readonly sentEmailsService: SentEmailsService,
  ) { }

  ngOnInit(): void {
    this.reason = ReasonDisabledType.MAL_ATTRIBUE;
  }

  onDisableProspect() {
    if (this.prospect.stage == 0) {
      this.prospectService.disable(this.prospect.id, this.reason);
    } else if (this.prospect.stage == 1) {
      this.prospectService.updateByStage(this.prospect.id, { stage: StageType.RESEARCH }, this.bookmark.prospect);
      this.remindersService.updateByStage(this.prospect.id, { stage: StageType.RESEARCH });
      this.meetingsService.updateByStage(this.prospect.id, { stage: StageType.RESEARCH });
      this.bookmarksService.updateByStage(this.prospect.id, { stage: StageType.RESEARCH });
      this.sentEmailsService.updateByStage(this.prospect.id, { stage: StageType.RESEARCH });
      this.bookmarksService.delete(this.bookmark.id)
      this.prospectService.updateIsBookmarked(this.prospect.id, { isBookmarked: false });

      console.log("removed from bookmarks");
      this.eventsService.create({
        type: EventType.DELETE_BOOKMARKS,
        prospect: this.prospect,
        date: new Date,
        description: `${EventDescriptionType.DELETE_BOOKMARKS} ${this.authService.currentUserSubject.getValue().pseudo}`
      });
      this.prospectService.disable(this.bookmark.prospect.id, this.reason)
    }
    this.toastsService.addToast({
      type: "alert-error",
      message: "Prospect désactivé"
    })
  }

}
