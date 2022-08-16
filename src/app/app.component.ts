import { Component } from '@angular/core';
import { Subscription } from 'rxjs';
import { DataThemeService } from './services/common/data-theme.service';
@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'prospectix-front';
  dataTheme!: string;
  subscription!: Subscription;
  constructor(
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
