import { Component } from '@angular/core';
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
  mainTheme!: string;
  currentUser!: ProjectManager;
  constructor(
    private router: Router,
    private authService: AuthService
    ) {
      this.authService.currentUser.subscribe(x => this.currentUser = x)
    }
  ngOnInit() {
  }

  logout() {
    this.authService.logout();
    this.router.navigate(["/login"]);
    // this.router.navigateByUrl("http://localhost:4200/login");
  }
}
