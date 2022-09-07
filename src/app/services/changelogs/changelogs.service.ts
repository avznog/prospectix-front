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
        version: "0.1.0.3",
        date: new Date("2022-09-07T00:00:00.000Z"),
        bugs: [
          "Les dropdown rendez-vous et rappel ont été transformés en modal: ils se ferment bien lors de l'ajout d'un rappel / rdb et ne dépassent plus au delà du cadre"
        ],
        features: [
          
        ]
      },
      {
        version: "0.1.0.2",
        date: new Date("2022-09-07T00:00:00.000Z"),
        bugs: [
          "La fenetre d'ajout d'un prospect disparaît bien lorsque le prospect est ajouté",
          "Il est maintenant possible de scroll sur la fenêtre d'ajout d'un prospect si l'écran est trop petit pour tout afficher"
        ],
        features: [
          
        ]
      },
      {
        version: "0.1.0.1",
        date: new Date("2022-09-07T00:00:00.000Z"),
        bugs: [
          "Fix comment bug"
        ],
        features: [
          
        ]
      },
      {
        version: "0.1",
        date: new Date("2022-09-06T00:00:00.000Z"),
        bugs: [
          
        ],
        features: [
          "Version de préproduction"
        ]
      },
      {
        version: "0.0.9",
        date: new Date("2022-09-06T00:00:00.000Z"),
        bugs: [
          "Fix bug db / changed db => Ready for Pre Prod"
        ],
        features: [
        ]
      },
      {
        version: "0.0.8",
        date: new Date("2022-09-05T00:00:00.000Z"),
        bugs: [
        ],
        features: [
          "Ajout de 3000 prospects de test dans la base de données"
        ]
      },
      {
        version: "0.0.7",
        date: new Date("2022-09-03T00:00:00.000Z"),
        bugs: [
          "Réduction de la taille du bouton version",
          "Suppression du bouton version pour les CDP"
        ],
        features: [
          "Modification du nombre d'éléments pour les pages recherche, rappels, rendez-vous, favoris, utilisateurs, objectifs : 2 > 20"
        ]
      },
      {
        version: "0.0.6",
        date: new Date("2022-09-01T00:00:00.000Z"),
        bugs: [
          "Fix des reminders pour qu'ils s'affichent bien selon la priorité: Attention ! tri par done / undone toujours bugged"
        ],
        features: [
          "Ajout du dashboard",
          "Tri des goals / reminders du dashboard pour n'afficher que ceux du CDP connecté"
        ]
      },
      {
        version: "0.0.5.1",
        date: new Date("2022-08-31T00:00:00.000Z"),
        bugs: [
          "Fix le problème des accents lors de l'ajout d'utilisateurs",
          "Suppression du toast de maj sur la page de login"
        ],
        features: [
        ]
      },
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
