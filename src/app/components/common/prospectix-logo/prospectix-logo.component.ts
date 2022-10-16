import { Component, Input, OnInit } from '@angular/core';
import { DataThemeService } from 'src/app/services/common/data-theme.service';

@Component({
  selector: 'app-prospectix-logo',
  templateUrl: './prospectix-logo.component.html',
  styleUrls: ['./prospectix-logo.component.scss']
})
export class ProspectixLogoComponent implements OnInit {

  @Input("class") class = "";
  constructor(
    public readonly dataThemeService: DataThemeService
  ) { }

  ngOnInit(): void {
  }

}
