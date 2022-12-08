import { Component } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { ChangelogsService } from './services/changelogs/changelogs.service';
import { DataThemeService } from './services/common/data-theme.service';
import { RemindersService } from './services/reminders/reminders.service';
import { ToastsService } from './services/toasts/toasts.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'Prospectix';
  dataTheme: string = "";
  constructor(
    public authService: AuthService,
    public readonly dataThemeService: DataThemeService,
    public readonly changelogsService: ChangelogsService,
    public readonly router: Router,
    public readonly toastsService: ToastsService,
    public readonly remindersService: RemindersService
  ) { 
  }
  
  ngOnInit() {
    this.dataThemeService.sendData(localStorage.getItem("theme") || "jisep");
  } 
}
