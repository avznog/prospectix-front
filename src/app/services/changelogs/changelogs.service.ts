import { Injectable } from '@angular/core';
import { Changelog } from 'src/app/models/changelog.model';

@Injectable({
  providedIn: 'root'
})
export class ChangelogsService {
  changelogs: Changelog[] = [];
  constructor() {
    this.changelogs = [
      {
        version: 0.1,
        date: new Date(),
        bugs: [
          "Correction de l'affichage déformé du header",
          "Correction du flash lors du changement de prospect"
        ],
        features: [
          "Feature de dashboard",
          "Feature de mail",
          "Feature de changelog"
        ]
      }
    ]
   }

}
