import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { DataThemeService } from 'src/app/services/common/data-theme.service';

@Component({
  selector: 'app-version',
  templateUrl: './version.component.html',
  styleUrls: ['./version.component.scss']
})
export class VersionComponent implements OnInit {

  constructor(
    public readonly authService: AuthService,
    public readonly dataThemeService: DataThemeService

  ) { }

  ngOnInit(): void {
  }

}
