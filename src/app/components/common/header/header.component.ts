import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
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

  @Input("class") class = "";
  scrolling = false;

  constructor(
    public authService: AuthService,
    public readonly changelogsService: ChangelogsService,
    public readonly statisticsService: StatisticsService,
    public readonly bookmarksService: BookmarksService,
    public readonly router: Router
  ) { }

  ngOnInit(): void {
  }
  
  logout() {
    this.authService.logout();
  }

  @HostListener("window:scroll")
  public onScroll(event: Event) {
    this.scrolling = document.documentElement.scrollTop > 10
  }
}
