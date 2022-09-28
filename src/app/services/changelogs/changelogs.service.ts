import { Injectable } from '@angular/core';
import { Changelog } from 'src/app/models/changelog.model';

@Injectable({
  providedIn: 'root'
})
export class ChangelogsService {
  changelogs: Changelog[] = [];
  localVersion: string = "";
  constructor(
  ) {
    this.localVersion = localStorage.getItem("version") ?? "";
    this.changelogs = [
      {
        version: "0.7",
        date: new Date("2022-09-28T00:00:00.000Z"),
        bugs: [
           ],
        features: [
          "Grosse refonte graphique: colorisation des boutons / cartes de prospect / header",
          "Clean du code en interne"
        ]
      },
      {
        version: "0.6.1",
        date: new Date("2022-09-27T00:00:00.000Z"),
        bugs: [
          
           ],
        features: [
          "Ajout des dates en francais",
          "refonte du design pour coller le header et les boutons de pagination"
        ]
      },
      {
        version: "0.6",
        date: new Date("2022-09-26T00:00:00.000Z"),
        bugs: [
          "Résolution du bug de la non actualisation de la disparition d'un prospect si on clique sur disabled",
          "Résolution d'un bug de chargement des utilisateurs",
          "Suppression du bouton \"Version\" pour les chefs de projet",
          "Résolution du bug d'affichage de la liste de sélection du type de rendez-vous",
          "Résolution du bug d'affichage du bouton rappel et refus sur la page rechercher"
           ],
        features: [
          "Changement du placement du bouton \"rendez-vous / rappel effectué\“",
          "Modification de la position et du contenu du bouton \"Non pertinent\" et ajout d'un modal et d'un type de suppression",
          "Le champ de recherche permet inclut maintenant les domaines d'activité"
        ]
      },
      {
        version: "0.5",
        date: new Date("2022-09-21T00:00:00.000Z"),
        bugs: [
          "Résolution du bug de la non-incrémentation des pas de réponse dans la page Favoris"
           ],
        features: [
         "Ajout d'un pop up de confirmation de l'ajout d'un favori (uniquement pour l'AJOUT)",
         "Ajout d'un pop up de confirmation de l'ajout d'un mail",
         "Ajout de l'heure d'un rendez-vous",
         "Changement de la puce de nouvelle version: elle est maintenant au dessus du bouton \"Version\"",
         "Ajout d'un bouton \"Non pertinent\" sur la page de recherche de prospect dans le cas ou le prospect n'est pas pertinent ",
         "Inversion du sens d'affichage de l'historique du prospect: le plus récent en haut"
        ]
      },
      {
        version: "0.4.5",
        date: new Date("2022-09-21T00:00:00.000Z"),
        bugs: [
           ],
        features: [
         "Ajout d'un champ de recherche pour les pages recherche et favoris: le champ désactive le tri des villes / domaines et vice versa"
        ]
      },
      {
        version: "0.4.4",
        date: new Date("2022-09-21T00:00:00.000Z"),
        bugs: [
          "fix du bug de recherche par ville / domaine d'activité de la page de recherche",
          "Fix du bug de recherche par ville / domaine d'activité de la page de favoris"
        ],
        features: [
         
        ]
      },
      {
        version: "0.4.3",
        date: new Date("2022-09-19T00:00:00.000Z"),
        bugs: [
        ],
        features: [
          "Ajout du système d'historique de statistiques"
        ]
      },
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
        ],
        features: [
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
