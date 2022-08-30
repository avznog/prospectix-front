import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { ChangelogsService } from 'src/app/services/changelogs/changelogs.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit {

  constructor(
    public authService: AuthService,
    public readonly changelogsService: ChangelogsService
  ) { }

  ngOnInit(): void {
  }
  
  logout() {
    this.authService.logout();
  }
}
