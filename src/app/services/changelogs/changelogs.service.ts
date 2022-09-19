import { Injectable } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';
import { Changelog } from 'src/app/models/changelog.model';

@Injectable({
  providedIn: 'root'
})
export class ChangelogsService {
  changelogs: Changelog[] = [];
  localVersion: string = "";
  constructor(
    private readonly authService: AuthService
  ) {
    this.localVersion = localStorage.getItem("version") ?? "";
    console.log(this.authService.currentUserSubject.getValue().admin)
    this.changelogs = [
      {
        version: "0.4.2",
        date: new Date("2022-09-19T00:00:00.000Z"),
        bugs: [
          "Changement du système de reset de stats"
        ],
        features: [
        ]
      },
      {
        version: "0.4.1",
        date: new Date("2022-09-18T00:00:00.000Z"),
        bugs: [
          "Le tri par ville fonctionne désormais dans la page de recherche de prospect"
        ],
        features: [
        ]
      },
      {
        version: "0.4",
        date: new Date("2022-09-18T00:00:00.000Z"),
        bugs: [
          
        ],
        features: [
          "Ajout du système de statistiques",
          "Changement du header / ajout d'icônes",
          this.authService.currentUserSubject.getValue().admin ? "Modification de la page de version pour cacher les informations sensibles aux cdp" : ""
        ]
      },
      {
        version: "0.3",
        date: new Date("2022-09-15T00:00:00.000Z"),
        bugs: [
          "Résolution du bug de favoris"
        ],
        features: [
        ]
      },
      {
        version: "0.3",
        date: new Date("2022-09-15T00:00:00.000Z"),
        bugs: [
          "Résolution du bug de l'édition de prospect (ne fonctionne parfaitement que sur la page de recherche), le reste il faut refresh pour voir les résultats"
        ],
        features: [
          "Nouveau workflow fonctionnel"
        ]
      },
      {
        version: "0.2B.1",
        date: new Date("2022-09-14T00:00:00.000Z"),
        bugs: [
          
        ],
        features: [
          "Modification du logo d'onglet & de login page"
        ]
      },
      {
        version: "0.2B.1",
        date: new Date("2022-09-14T00:00:00.000Z"),
        bugs: [
          
        ],
        features: [
          "Ajout de la limite sur la liste de favoris"
        ]
      },
      {
        version: "0.2B",
        date: new Date("2022-09-14T00:00:00.000Z"),
        bugs: [
          "Reverted bugs, back to version 0.2"
        ],
        features: [
        ]
      },
      {
        version: "0.2",
        date: new Date("2022-09-12T00:00:00.000Z"),
        bugs: [
        ],
        features: [
          "Revue totale du workflow de prospectix: "
        ]
      },
      {
        version: "0.1.1",
        date: new Date("2022-09-08T00:00:00.000Z"),
        bugs: [
          "Modification des types de rendez-vous pour qu'ils ne dépassent pas de la zone dans la page de rendez-vous"
        ],
        features: [
          "Réduction de la taille du bouton \"nouvelle version\"",
          "Refonte de la tuile du prospect: réduction des boutons et modification de leur emplacements",
          "Ajout d'un spacing entre les éléments des blocs de recherche des pages \"recherche\" et \"Mes prospects favoris\"",
          "Refonte graphique du header: réduction de la taille des boutons de thème et de déconnexion, augmentation de la taille des boutons principaux, regroupement des pages d'administrateur dans un dropdown",
          "Refonte de la page d'édition d'un prospect: ajout de la possibilité de cliquer hors de la zone pour enlever le pop up"
        ]
      },
      {
        version: "0.1.0.5",
        date: new Date("2022-09-07T00:00:00.000Z"),
        bugs: [
          "Résolution du bug du numéro de page"
        ],
        features: [
          
        ]
      },
      {
        version: "0.1.0.4",
        date: new Date("2022-09-07T00:00:00.000Z"),
        bugs: [
          "Résolution du bug de refresh quand on se log"
        ],
        features: [
          
        ]
      },
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
          this.authService.currentUserSubject.getValue().admin ? "Suppression du bouton version pour les CDP" : ""
        ],
        features: [
          this.authService.currentUserSubject.getValue().admin ? "Modification du nombre d'éléments pour les pages recherche, rappels, rendez-vous, favoris, utilisateurs, objectifs : 2 > 20" : "Modification du nombre d'éléments pour les pages recherche, rappels, rendez-vous, favoris, utilisateurs : 2 > 20"
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
          this.authService.currentUserSubject.getValue().admin ? "Tri des goals / reminders du dashboard pour n'afficher que ceux du CDP connecté" : ""
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
          this.authService.currentUserSubject.getValue().admin ? "Ajout de la pagination dans les pages: Recherche, rappels, rendez-vous, favoris, utilisateurs, objectifs": "Ajout de la pagination dans les pages: Recherche, rappels, rendez-vous, favoris, utilisateurs",
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
          this.authService.currentUserSubject.getValue().admin ? "page de gestion des objectifs - front moche" : ""
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
