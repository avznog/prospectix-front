import { Injectable } from '@angular/core';
import { Changelog } from 'src/app/models/changelog.model';

@Injectable({
  providedIn: 'root'
})
export class ChangelogsService {
  changelogs: Changelog[] = [];
  localVersion: string = "";
  // Ce message est pour toi, Responsable Technique qui dev sur Prospectix.
  // Tu as entre les mains un outil formidable, qui a représenté l'entièreté de mon année de Rtech. 
  // C'est mon bébé, donc prends en soin.
  // Si jamais tu as du mal, tu bloques, ou tu penses abandonner, n'oublie jamais que l'entièreté des Alumni Responsables Technique est la
  // pour t'aider, à l'image de Mufasa dans le roi lion mdr
  // Prends soin de cet outil, car c'est une masterclass
  // Je compte sur toi pour reprendre le flambeau de la plus belle des manières
  // C'est avec une larme que mon mandat s'achève et que je vous lègue Prospectix
  // Coeur sur vous, 
  // Benjamin GONZVA, Responsable Technique 2022-2023 ♥️
  constructor(
  ) {
    this.localVersion = localStorage.getItem("version") ?? "";
    this.changelogs = [
      {
        version: "4.0.2",
        date: new Date("2023-05-04T00:00:00.000Z"),
        bugs: [
          "Critical HotFix : les dates entrées en base de données étaient entrées avec 2H de retard. Fixé en back pour tous les enregistrements de date"
        ],
        features: [
          "Mise à jour de la notification slack pour les rappels. Elle se fait désormais 30 mn à l'avance"
        ]
      },
      {
        version: "4.0.1",
        date: new Date("2023-05-01T00:00:00.000Z"),
        bugs: [
          "Résolution de bugs d'affichage des pop-ups"
        ],
        features: [
          ""
        ]
      },
      {
        version: "4.0",
        date: new Date("2023-04-30T00:00:00.000Z"),
        bugs: [
          "Résolution des bugs de pagination de la page de recherche"
          ],
        features: [
          "[Base de données] - Grosse refonte de la base de données, suite à un scraping plus visé. Réduction du nombre de villes & de domaines d'activités. Scraping V2",
          "[Performances / Opitmisation] - Prospectix est maintenant une PWA. Il est possible de la télécharger depuis Chrome ou téléphone mobile",
          "[Performances / Optimisation] - Énorme travail sur les performances / optimisation de l'outil. Utilisation de ngx-smart-modals, qui permet de ne pas préloader tous les modaux. Aussi, regroupement de certains modaux en 1 seul composant.",
          "[Performances / Optimisation] - Gros travail sur la recherche. Ell est désormais cross search, compatible sur tous les champs, pour la recherche principale, favoris, rendez-vous, meetings, mails",
          "[Rework Activités] - Création d'activités primaires et secondaires. Dix activités primaires regroupent maintenant l'entièreté des activitiés.",
          "[Rework Activités] - Changement de l'interface de recherche et de la méthode de recherche de prospects. Tous les champs de recherche sont compatibles",
          "[Rework Activités] - Changement des méthodes de recherche des prospects",
          "[Rework Villes] - Les villes s'affichent désormais par nom au lieu de s'afficher par zipcode. Néanmoins, lorsque l'on veut modifier / ajouter des villes, il est possible de sélectionner une ville selon son zipcode",
          "[Rework Activités / Villes] - Ajout d'attributs 'version' & 'dateScraped' pour les prospects / activités primaires / activités secondaires / villes pour pouvoir traquer les différentes modifications de base",
          "[Rework Activités / Villes] - Lorsque l'on ajoute ou edit un prospect, les villes / domains d'activités disponibles sont les mêmes que ceux de la recherche",
          "[Rework Poids] - Modification du 'Poids' de chaque catégorie (IA) : maintenant, les catégories primaires ont aussi un 'Poids'. Aussi, le nombre d'appels est aussi enregistré afin de pouvoir pondéré les résultats",
          "Refactor du code de search des rendez-vous / meetings / sentEmails",
          "Ajout d'une nouvelle page au backoffice : il est désormais possible de choisir la version de prospect / ville / activités secondaires - primaires que l'on veut rechercher",
          "Ajout d'un type d'évènement : Mise à jour de prospect, pour lorsqu'un prospect est mis à jour à la suite d'un scraping"
        ]
      },
      {
        version: "3.2",
        date: new Date("2023-03-31T00:00:00.000Z"),
        bugs: [
          ],
        features: [
          "Ajout de la fonctionnnalité de notation / qualification d'un prospect : chaque catégorie de prospect a un poids (entre 0 et 1). Selon l'action qu'un utilisateur effectue sur un prospect, il affine le poids de la catégorie de ce dernier"
        ]
      },
      {
        version: "3.1.2",
        date: new Date("2023-02-16T00:00:00.000Z"),
        bugs: [
          ],
        features: [
          "Suppression du logo de la saint Valentin",
          "Ajout du tri par semaines pour la tour de contrôle"
        ]
      },
      {
        version: "3.1.1",
        date: new Date("2023-02-12T00:00:00.000Z"),
        bugs: [
          "Résolution du bug qui ne justifiait pas le texte lors de l'envoi d'un mail",
          "Résolution du bug qui affichait deux fois le header d'un mail"
          ],
        features: [
          "Ajout de la possiblité de modifier le contenu du template depuis la page d'envoi de mail",
          "Ajout de la plaquette de Skema Conseil (en pièce jointe d'un mail)"
        ]
      },
      {
        version: "3.1",
        date: new Date("2023-01-23T00:00:00.000Z"),
        bugs: [
          
          ],
        features: [
          "Evolution vers yarn 3.3.1"
        ]
      },
      {
        version: "3.0.3",
        date: new Date("2023-01-22T00:00:00.000Z"),
        bugs: [
          
          ],
        features: [
          "Ajout de la possibilité de classifier un prospect dès sa création",
          "Ajout des photos de profils: sur la page mon compte, dans la liste des utilisateurs, dans la liste des objectifs (watchtower) et dans la signature du template mail"
        ]
      },
      {
        version: "3.0.2",
        date: new Date("2023-01-22T00:00:00.000Z"),
        bugs: [
          "Résolution du bug de non affichage du style lors de l'envoi d'un mail"
          ],
        features: [
          "Ajout de la possibilité de laisser le champ \"Bonjour...\" vide lors de l'envoi d'un mail"
        ]
      },
      {
        version: "3.0.1",
        date: new Date("2023-01-19T00:00:00.000Z"),
        bugs: [
          
          ],
        features: [
          "Adaptation du mail template pour mobile: responsive"
        ]
      },
      {
        version: "3.0",
        date: new Date("2023-01-19T00:00:00.000Z"),
        bugs: [
          "Résolution des bugs liés à Sentry + modification des messages d'erreur + ajout direct des informations en contexte"
          ],
        features: [
          "Rework de la structure du back => del Modules",
          "Ajout de la possibilité de modifier un utilisateur",
          "Ajout d'une page 'Mon Compte'. Il est possible de visualiser ses informations et de se connecter / déconnecter / vérifier la connexion à Google",
          "Ajout de l'implémentation des template de mails. Prospectix prend maintenant en charge l'envoi de mail",
          "[MAILS]: Il est désomais possible de créer des templates de mails, dans une page réservée. Les administrateurs ont accès aux templates de tous les chefs de projets.",
          "[MAILS]: L'envoi de mails se fait désormais avec les templates. Pour envoyer un mail, il faut choisir le template à envoyer, le sujet, et le nom du client. Il est possible de marquer un mail comme envoyé séparément.",
          "[MAILS]: Le nom du template est désormais visible dans les mails envoyés et dans l'historique du prospect",
          "Ajout de l'implémentation de Google",
          "[GOOGLE]: Lors de la création d'un rendez-vous par un chef de projet, le rendez-vous s'ajoute automatiquement dans l'agenda Google",
          "[GOOGLE]: Un rendez-vous créé envoie une notification au mail du client et au chef de projet. Si le rendez-vous est en distanciel, l'invitation génère un lien Google Meet",
          "[GOOGLE]: Chaque chef de projet peut se connecter avec son compte JUNIORISEP depuis la page Mon Compte. Les tokens (gérés par Google) durent une semaine." 
        ]
      },
      {
        version: "2.0",
        date: new Date("2022-12-08T00:00:00.000Z"),
        bugs: [
          "Le bug du canal slack \"Champion\" devrait (enfin) être résolu"
          ],
        features: [
          "Ajout de l'horaire d'un pas de réponse dans la description de lévènement",
          "Suppression de l'ancien dashboard et des anciens objectifs",
          "Ajout d'une redirection par défaut vers la page des statistiques",
          "Les notifications en bas de l'écran apparaissent maintenant une fois que l'action est bien enregistrée en base",
          "Ajout de l'accès au panel administrateur à tous les admins",
          "Ajout du fonctionnement des obejctifs",
          "[OBJECTIFS]: Page dashboard: le cdp a accès à tous ses objectifs",
          "[OBJECTIFS]: Page tour de contrôle: les administrateurs ont accès à une page de surveillance de tous les objectifs Appels et Rendez-vous des cdp",
          "[OBJECTIFS]: Page objectifs: les administrateurs peuvent définir des objectifs aux chefs de projets",
          "[OBJECTIFS]: Notifications: les notifications de recap de la semaines sont adaptées en fonction des objectifs Appels et Rendez-vous"
        ]
      },
      {
        version: "1.6",
        date: new Date("2022-12-07T00:00:00.000Z"),
        bugs: [
         
          ],
        features: [
         "Ajout des thèmes et logos Noël"
        ],
      },
      {
        version: "1.5.2",
        date: new Date("2022-11-28T00:00:00.000Z"),
        bugs: [
         "Résolution du bug d'envoi des notifs slack sur les canaux champions"
          ],
        features: [
         "Changement des phrases d'affichage sur les coches de la zone de recherche des pages Rappels, Rendez-vous et Emails"
        ],
      },
      {
        version: "1.5.1",
        date: new Date("2022-12-01T00:00:00.000Z"),
        bugs: [
          "Résolution du bug d'affichage des stats de la semaine lors d'une semaine sur deux mois"
          ],
        features: [
        ],
      },
      {
        version: "1.5",
        date: new Date("2022-11-27T00:00:00.000Z"),
        bugs: [
         "Résolution de compte de l'historique des stats"
          ],
        features: [
         "Possibilité d'ajouter une ville"
        ],
      },
      {
        version: "1.4.1",
        date: new Date("2022-11-17T00:00:00.000Z"),
        bugs: [
         
          ],
        features: [
          "Ajout de la possibilité de modifier la date du rappel",
          "Ajout de la possibilité de modifier la date et l'heure du rendez-vous"
        ],
      },
      {
        version: "1.4",
        date: new Date("2022-11-16T00:00:00.000Z"),
        bugs: [
         "Résolution du bug d'affichage des dates de rendez-vous et rappels effectués"
          ],
        features: [
          "Ajout d'une page \"mails envoyés\": il est désormais possible d'envoyer un mail plus tard",
          "Ajout de la raison \"Holdings\" pour la suppression d'un prospect"
        ],
      },
      {
        version: "1.3.2",
        date: new Date("2022-11-14T00:00:00.000Z"),
        bugs: [
         "Résolution du bug d'affichage des statistiques à partir du lundi",
         "Résolution du bug d'affichage de l'historique des statistiques"
          ],
        features: [
          
        ],
      },
      {
        version: "1.3.1",
        date: new Date("2022-11-10T00:00:00.000Z"),
        bugs: [
         "Résolution du bug d'envoi de notif slack au 3e rdv"
          ],
        features: [
          
        ],
      },
      {
        version: "1.3",
        date: new Date("2022-11-09T00:00:00.000Z"),
        bugs: [
          "Résolution des bugs liés à l'encart de commentaire. Le commentaire est maintenant bien enregistré",
          "Résolution du bug de pagination qui affichait deux pages alors qu'une seule existait",
          "Résolution de bugs de padding sur la page d'activité pour le titre du graphique des rendez-vous décrochés",
          "Rectification du titre du graphe du classement des rappels : rappels effectués -> rappels créés"
          ],
        features: [
          "Ajout du bouton de modification d'un prospect sur les pages rappels et mails",
          "Lorque l'on clique sur l'email, il est désormais copié dans le clipboard",
          "Suppression du bouton mail depuis un rendez-vous, et ajout du bouton rendez-vous depuis la page mail",
          "Bouton de suppression du prospect ajouté dans la page des favoris",
          "Ajout de la possibilité de modifier l'heure d'un rappel (pas la date)",
          "Ajout du support de la recherche par numéro de téléphone sur les pages rechercher et favoris"
        ],
      },
      {
        version: "1.2",
        date: new Date("2022-11-08T00:00:00.000Z"),
        bugs: [
          "Résolution des bugs liés à l'ajout d'un prospect"
          ],
        features: [
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
