import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';
import { BookmarksService } from 'src/app/services/bookmarks/bookmarks.service';
import { CallsService } from 'src/app/services/calls/calls.service';
import { ChangelogsService } from 'src/app/services/changelogs/changelogs.service';
import { DataThemeService } from 'src/app/services/common/data-theme.service';

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
    public readonly bookmarksService: BookmarksService,
    public readonly router: Router,
    public dataThemeService: DataThemeService,
    public readonly callsService: CallsService
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
