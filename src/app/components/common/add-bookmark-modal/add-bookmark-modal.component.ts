import { Component, Input, OnInit } from '@angular/core';
import { StageType } from 'src/app/constants/stage.type';
import { CreateBookmarkDto } from 'src/app/dto/bookmarks/create-bookmark.dto';
import { Bookmark } from 'src/app/models/bookmark.model';
import { Prospect } from 'src/app/models/prospect.model';
import { BookmarksService } from 'src/app/services/bookmarks/bookmarks.service';
import { MeetingsService } from 'src/app/services/meetings/meetings.service';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';
import { RemindersService } from 'src/app/services/reminders/reminders.service';
import { SentEmailsService } from 'src/app/services/sent-emails/sent-emails.service';

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
  }

}
