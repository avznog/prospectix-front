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
        version: "0.0.5",
        date: new Date("2022-08-30T00:00:00.000Z"),
        bugs: [
        ],
        features: [
          "Ajout des changelogs"
        ]
      },
      {
        version: "0.0.4",
        date: new Date("2022-08-15T00:00:00.000Z"),
        bugs: [
          "Résolution de la mauvaise pagination",
          "Refactor du code pour une meilleure pagination",
          "Résolution de nombreux bugs sur la plateforme"
        ],
        features: [
          "Ajout des fonctionnalités d'ajout de rendez-vous / rappels",
          "Ajout de la pagination dans les pages: Recherche, rappels, rendez-vous, favoris, utilisateurs, objectifs",
          "Ajout de l'actualisation en temps réel des données",
          "Ajout des thèmes daisyUI"
        ]
      },
      {
        version: "0.0.3",
        date: new Date("2022-08-01T00:00:00.000Z"),
        bugs: [
        ],
        features: [
          "Ajout de la page de détails d'un prospect",
          "Fonctionnalité d'ajout d'un prospect",
          "Page + Fonctionnalité de favoris",
          "Bouton déconnexion et authentification"
        ]
      },
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
