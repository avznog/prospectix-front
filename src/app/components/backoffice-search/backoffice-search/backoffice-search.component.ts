import { Component, OnInit } from '@angular/core';
import { VersionCityType, VersionPrimaryActivityType, VersionProspectType, VersionSecondaryActivityType } from 'src/app/constants/versions.type';
import { SearchParamsService } from 'src/app/services/search-params/search-params.service';

@Component({
  selector: 'app-backoffice-search',
  templateUrl: './backoffice-search.component.html',
  styleUrls: ['./backoffice-search.component.scss']
})
export class BackofficeSearchComponent implements OnInit {

  versionsProspects = VersionProspectType;
  versionsCity = VersionCityType;
  versionsPrimaryAcitivity = VersionPrimaryActivityType;
  versionSecondaryActivity = VersionSecondaryActivityType;

  constructor(
    public readonly searchParamsService: SearchParamsService
  ) { 
  }

  ngOnInit(): void {
  }

}
