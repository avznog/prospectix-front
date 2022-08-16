import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataThemeService } from './services/common/data-theme.service';
import { Router } from '@angular/router';
import { AuthService } from './auth/auth.service';
import { ProjectManager } from './models/project-manager.model';

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
  currentUser!: ProjectManager;
  constructor(
    private router: Router,
    private authService: AuthService,
    private readonly dataThemeService: DataThemeService
    ) {
      this.authService.currentUser.subscribe(x => this.currentUser = x)
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

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
    // this.router.navigateByUrl("http://localhost:4200/login");
  }
}
