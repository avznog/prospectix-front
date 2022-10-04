import { Component, Input, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { EventDescriptionType } from 'src/app/constants/event-descriptions.type';
import { EventType } from 'src/app/constants/event.type';
import { StageType } from 'src/app/constants/stage.type';
import { CreateBookmarkDto } from 'src/app/dto/bookmarks/create-bookmark.dto';
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
  selector: 'app-add-bookmark-modal',
  templateUrl: './add-bookmark-modal.component.html',
  styleUrls: ['./add-bookmark-modal.component.scss']
})
export class AddBookmarkModalComponent implements OnInit {

  @Input() prospect!: Prospect;
  @Input() bookmark!: Bookmark;
  constructor(
    private readonly prospectService: ProspectsService,
    private readonly remindersService: RemindersService,
    private readonly meetingsService: MeetingsService,
    public readonly bookmarksService: BookmarksService,
    private readonly sentEmailsService: SentEmailsService,
    private readonly eventsService: EventsService,
    private readonly authService: AuthService,
    private readonly toastsService: ToastsService
  ) { }

  ngOnInit(): void {
  }
  
  onCreateBookmark() {
    this.prospectService.updateByStage(this.prospect.id, { stage: StageType.BOOKMARK} );
    this.remindersService.updateByStage(this.prospect.id, { stage: StageType.BOOKMARK });
    this.meetingsService.updateByStage(this.prospect.id, { stage: StageType.BOOKMARK });
    this.bookmarksService.updateByStage(this.prospect.id, { stage: StageType.BOOKMARK });
    this.sentEmailsService.updateByStage(this.prospect.id, { stage: StageType.BOOKMARK });
    const createBookmarkDto: CreateBookmarkDto = {
      prospect: this.prospect,
      creationDate: new Date()
    };
    this.bookmarksService.create(createBookmarkDto);
    this.prospectService.updateIsBookmarked(this.prospect.id, { isBookmarked: true });

    this.eventsService.create({
      type: EventType.ADD_BOOKMARKS,
      prospect: this.prospect,
      date: new Date,
      description: `${EventDescriptionType.ADD_BOOKMARKS} ${this.authService.currentUserSubject.getValue().pseudo}`
    });

    this.toastsService.addToast({
      type: "alert-warning",
      message: "Prospect ajouté en favoris"
    });

    console.log("added to bookmarks");
  }

}
