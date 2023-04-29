import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-no-result',
  templateUrl: './no-result.component.html',
  styleUrls: ['./no-result.component.scss']
})
export class NoResultComponent implements OnInit {
  listErrorMessages : string[] = [
    "Benjamin Gonzva est mon créateur. Il n'y a qu'a lui que je peux répondre.",
    "Essaie d'autre catégories, tu trouveras surement mieux ...",
    "Une autre ville possède renferme d'autres secrets ...",
    "C'est en cherchant que le CDP trouva ...",
    "Demande des prospects au pôle Techn... non, ils sont surbookés, change de catégories !",
    "Recherche tous les prospects en A, certains te satisferont surement",
    "La rumeur dit qu’un appel peut apporter 100 JEH 👀 Peut-être le prochain ?",
    "Un chef de projet a besoin de Prospectix comme un aventurier a besoin de sa boussole 🧭",
    "Un shark sachant prospecter avec Prospectix est un bon shark 🦈",
    "Si tu ne penses pas être le meilleur, c’est que tu ne l’es pas 🫡",
    "Un rendez-vous s’obtient en appelant, une mission s’obtient en signant",
    "Petite sardine deviendra grand requin...",
    "Attention, un shark peut en cacher un autre...",
    "Chaque appel est un pas sur le chemin de la signature ✍🏻",
    "Une semaine ne peut être bonne sans son lot de rendez vous",
    "C'est un petit appel pour toi, mais un appel de géant pour Junior ISEP 🌙",
    "Prospecter en dehors des heures légales te coûtera cher ...",
    "Abandonner, c'est pour les faibles",
    "Le requin est le plus grand des poissons, le Chef de Projet est le plus grand des requins"

  ];
  currentErrorMessage : string = "Essaie d'autre catégories, tu trouveras surement mieux ...";
  constructor(
    public readonly authService: AuthService,
    public readonly router: Router
  ) { 
    const randomIndex = Math.floor(Math.random() * this.listErrorMessages.length);
    this.currentErrorMessage =  this.listErrorMessages[randomIndex];
  }

  ngOnInit(): void {
    const randomIndex = Math.floor(Math.random() * this.listErrorMessages.length);
    this.currentErrorMessage =  this.listErrorMessages[randomIndex]; 
  }

}
