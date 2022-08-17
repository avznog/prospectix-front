import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataThemeService } from './services/common/data-theme.service';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'prospectix-front';
  dataTheme!: string;
  subscription!: Subscription;
  mainTheme!: string;
  constructor(
    private router: Router,
    public authService: AuthService,
    private readonly dataThemeService: DataThemeService
  ) { 
    this.subscription = this.dataThemeService.getData()
      .subscribe(x => {
        console.log(x)
        localStorage.setItem("theme", x)
        this.dataTheme = x
      });
  }

  

  ngOnInit() {
    console.log(localStorage.getItem("theme"))
    this.dataThemeService.sendData(localStorage.getItem("theme") || "")
  }

}
