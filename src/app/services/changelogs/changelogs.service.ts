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
        version: "1.2",
        date: new Date("2022-11-07T00:00:00.000Z"),
        bugs: [

          ],
        features: [
          "Ajout du support de la recherche par numéro de téléphone sur les pages rechercher et favoris"
        ]
      },
      {
        version: "1.1",
        date: new Date("2022-10-23T00:00:00.000Z"),
        bugs: [
          ],
        features: [
          "Ajout des notifications slack",
          "Ajout des notifications sur le canal 'Fraude'",
          "Ajout des notifications sur le canal 'Champion'",
          "Ajout des notifications sur le canal 'Recap'",
          "Ajout des notifications pour les rappels pour chaque chef de projet"
        ]
      },
      {
        version: "1.0.3",
        date: new Date("2022-10-23T00:00:00.000Z"),
        bugs: [
          "Résolution du bug qui ne permettait pas de naviguer dans les pages de rappels / rendez-vous / mails",
          "Résolution du bug qui affichait les dates de rappels au format anglais (sous 12h)",
          
          ],
        features: [
          "Ajout du classement chronologique des rappels et rendez-vous"
        ]
      },
      {
        version: "1.0.2",
        date: new Date("2022-10-21T00:00:00.000Z"),
        bugs: [
          "Résolution du bug qui désactivait le bouton page supérieure sur les favoris lorsqu'on ajoute plus de 20 favoris (plus d'une page)",
          "Résolution du bug de favoris maximum -> définis à 50 favoris maximum"
          ],
        features: [
          
        ]
      },
      {
        version: "1.0.1",
        date: new Date("2022-10-20T00:00:00.000Z"),
        bugs: [
            
           ],
        features: [
          "Ajout d'un message de survol pour la priorité"
        ]
      },
      {
        version: "1.0",
        date: new Date("2022-10-17T00:00:00.000Z"),
        bugs: [
            
           ],
        features: [
          "Déploiement officiel de la v1",
          "Ajustement des heures pour les statistiques"
        ]
      },
      {
        version: "0.12",
        date: new Date("2022-10-14T00:00:00.000Z"),
        bugs: [
            
           ],
        features: [
          "Ajout des logoooooos"
          
        ]
      },
      {
        version: "0.11.4",
        date: new Date("2022-10-14T00:00:00.000Z"),
        bugs: [
            
           ],
        features: [
          "Ajout des notifications dans le canal slack lors de la création d'un rendez-vous",
          
        ]
      },
      {
        version: "0.11.3",
        date: new Date("2022-10-13T00:00:00.000Z"),
        bugs: [
            "Remove drawer for history => replaced by modal"
           ],
        features: [
          "Ajout d'un blocage du bouton d'ajout d'un prospect si les champs nom, adresse ou téléphone ne sont pas renseignés"
        ]
      },
      {
        version: "0.11.2",
        date: new Date("2022-10-13T00:00:00.000Z"),
        bugs: [
            "Correction de bugs sur les stats, concernant les dates",
            "Résolution du bug de suppression du favoris"
           ],
        features: [
        ]
      },
      {
        version: "0.11.1",
        date: new Date("2022-10-12T00:00:00.000Z"),
        bugs: [
            
           ],
        features: [
          "Nouveau LOGOOOOOOOOOOOO ❤️ (merci Armand)",
          "Le logo s'adapte au thème actuel"
        ]
      },
      {
        version: "0.11",
        date: new Date("2022-10-12T00:00:00.000Z"),
        bugs: [
            
           ],
        features: [
          "Refonte totale de la page des statistiques",
          "Ajout des graphiques dans la page des statistiques"
        ]
      },
      {
        version: "0.10.2",
        date: new Date("2022-10-11T00:00:00.000Z"),
        bugs: [
            "Résolution d'une partie du bug de calendrier du bouton d'ajout de date de rappel / rendez-vous"
           ],
        features: [
          
        ]
      },
      {
        version: "0.10.1",
        date: new Date("2022-10-05T00:00:00.000Z"),
        bugs: [
          "Résolution du bug qui faisait que l'on pouvait avancer dans la pagination aussi loin que l'on veut"
           ],
        features: [
          "Ajout du compte des domaines d'activités",
          "Ajout du compte pour les villes",
          
        ]
      },
      {
        version: "0.10",
        date: new Date("2022-10-04T00:00:00.000Z"),
        bugs: [
          "Rectification de la couleur de l'alerte de nouvelle version"
           ],
        features: [
          "Ajout des notifications d'action (taost en bas à droite de l'écran)"
        ]
      },
      {
        version: "0.9.3",
        date: new Date("2022-10-03T00:00:00.000Z"),
        bugs: [
          "Résolution d'un bug invisible sur la page de login",
          "Résolution de bug où les champs apparaissaient violets au lieu de blanc dans la tuile et sur le login",
          "Résolution du bug de recherche google lorsqu'il y avait un & dans le nom du prospect"
           ],
        features: [
         "Ajout des boutons 'Passage en PRO' et 'Effectué' pour les rendez-vous",
         "Update du theme de jisep",
         "Create thème Junior ISEP"
        ]
      },
      {
        version: "0.9.2",
        date: new Date("2022-10-03T00:00:00.000Z"),
        bugs: [
          "Résolution du bug des boutons de pages qui s'affichaient trop sur la gauche lorsque la page est vide",
          "Résolution du bug de marges sur la page de login",
          "Résolution du bug de clic sur le bouton de thème (le bouton de thème n'était pas cliquable de partout)"
           ],
        features: [
          "Update du design des boutons de la tuile / désactivation si le mail n'existe pas",
          "Ajout de l'appartition du mail / website au survol",
          "Changement de l'endroit du bouton pas de réponse",
          "Modification de l'emplacement des options de filtrage des rappels et des rendez-vous",
          "Modification du header / thème / ajout d'un blur"
        ]
      },
      {
        version: "0.9",
        date: new Date("2022-10-01T00:00:00.000Z"),
        bugs: [
          
           ],
        features: [
         "Refonte du design des boutons de la tuile",
         "Refonte graphique",
         "Refonte de la page de statistics"
        ]
      },
      {
        version: "0.8",
        date: new Date("2022-09-29T00:00:00.000Z"),
        bugs: [
          
           ],
        features: [
          "Refonte du design de la tuile",
          "Refonte des couleurs du header (temporaire)"
        ]
      },
      {
        version: "0.7.3",
        date: new Date("2022-09-29T00:00:00.000Z"),
        bugs: [
          "La recherche est mainteannt sauvegardée si l'on change de page.",
          "Pour rechercher, il faut maintenant appuyer sur entrée"
           ],
        features: [
          "La taille de la zone de commentaire est maintenant ajustable"
        ]
      },
      {
        version: "0.7.2",
        date: new Date("2022-09-28T00:00:00.000Z"),
        bugs: [
          "Résolution du bug ou un rappel / rendez-vous se supprimait si l'on effectuait dessus une action de qualification: les rappels / rendez-vous effectués s'affichent maintenant tous"
           ],
        features: [
          "Suppression des boutons RDV / rappel effectué: le compte s'effectue automatiquement avec l'action suivante", 
        ]
      },
      {
        version: "0.7.1",
        date: new Date("2022-09-28T00:00:00.000Z"),
        bugs: [
           ],
        features: [
          "Ajout d'un pop up de confirmation suite au clic du bouton refus"
        ]
      },
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
