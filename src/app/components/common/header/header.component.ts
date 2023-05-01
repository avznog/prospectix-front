import { Component, HostListener, Input, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { NgxSmartModalService } from 'ngx-smart-modal';
import { AuthService } from 'src/app/auth/auth.service';
import { BookmarksService } from 'src/app/services/bookmarks/bookmarks.service';
import { ChangelogsService } from 'src/app/services/changelogs/changelogs.service';
import { DataThemeService } from 'src/app/services/common/data-theme.service';
import { VersionComponent } from '../version/version.component';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  @Input("class") class = "";
  scrolling = false;
  today: Date = new Date()

  constructor(
    public authService: AuthService,
    public readonly changelogsService: ChangelogsService,
    public readonly bookmarksService: BookmarksService,
    public readonly router: Router,
    public readonly dataThemeService: DataThemeService,
    public readonly ngxSmartModalService: NgxSmartModalService
  ) { }

  ngOnInit(): void {
    this.ngxSmartModalService.create('versions', VersionComponent).addCustomClass('changelogs').closable = false;
  }
  
  logout() {
    this.authService.logout();
  }

  @HostListener("window:scroll")
  public onScroll(event: Event) {
    this.scrolling = document.documentElement.scrollTop > 10
  }
}
