import { Component, OnInit } from '@angular/core';
import { DataThemeService } from 'src/app/services/common/data-theme.service';

@Component({
  selector: 'app-theme-picker',
  templateUrl: './theme-picker.component.html',
  styleUrls: ['./theme-picker.component.scss']
})
export class ThemePickerComponent implements OnInit {

  currentTheme!: string;
  constructor(
    private readonly dataThemeService: DataThemeService
  ) { }

  ngOnInit(): void {
  }

  onChangeTheme(newTheme: string) {
    this.currentTheme = newTheme;
    this.dataThemeService.sendData(newTheme);
  }

}
