import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataThemeService } from './services/common/data-theme.service';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'prospectix-front';
  dataTheme: string = "";
  constructor(
    public authService: AuthService,
    public readonly dataThemeService: DataThemeService
  ) { 
  }
  
  ngOnInit() {
    this.dataThemeService.sendData(localStorage.getItem("theme") || "")
  }

}
