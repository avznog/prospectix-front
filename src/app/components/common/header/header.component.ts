import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { BookmarksService } from 'src/app/services/bookmarks/bookmarks.service';
import { ChangelogsService } from 'src/app/services/changelogs/changelogs.service';
import { StatisticsService } from 'src/app/services/statistics/statistics.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public readonly changelogsService: ChangelogsService,
    public readonly statisticsService: StatisticsService,
    public readonly bookmarksService: BookmarksService
  ) { }

  ngOnInit(): void {
  }
  
  logout() {
    this.authService.logout();
  }
}
