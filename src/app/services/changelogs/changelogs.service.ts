import { Injectable } from '@angular/core';
import { Changelog } from 'src/app/models/changelog.model';

@Injectable({
  providedIn: 'root'
})
export class ChangelogsService {
  changelogs: Changelog[] = [];
  localVersion: string = "";
  constructor() {
    this.localVersion = localStorage.getItem("version") ?? "";
    this.changelogs = [
      {
        version: "0.0.2",
        date: new Date("2022-07-15T00:00:00.000Z"),
        bugs: [
        ],
        features: [
          "Refonte du front pour de nombreuses pages -> front joli",
        ]
      },
      {
        version: "0.0.1",
        date: new Date("2022-06-26T00:00:00.000Z"),
        bugs: [
        ],
        features: [
          "Page de recherche - front moche",
          "Page de rappels - front moche",
          "Page de rendez-vous - front moche",
          "Page de gestion des utilisateurs - front moche",
          "page de gestion des objectifs - front moche"
        ]
      },
    ];
    console.log(this.localVersion)
    console.log(this.changelogs[0].version)
   }

   updateVersion() {
    localStorage.setItem("version",this.changelogs[0].version)
    this.localVersion = localStorage.getItem("version") ?? "";
    window.location.reload()
   }

}
