import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/auth/auth.service';

@Component({
  selector: 'app-no-result',
  templateUrl: './no-result.component.html',
  styleUrls: ['./no-result.component.scss']
})
export class NoResultComponent implements OnInit {
  listErrorMessages : string[] = [
    "Essaie d'autre catégories, tu trouveras surement mieux ...",
    "Une autre ville possède renferme d'autres secrets ...",
    "C'est en cherchant que le CDP trouva ...",
    "Demande des prospects au pôle Techn... non, ils sont surbookés, change de catégories !",
    "Recherche tous les prospects en A, certains te satisferont surement"
  ];
  currentErrorMessage : string = "Essaie d'autre catégories, tu trouveras surement mieux ...";
  constructor(
    public readonly authService: AuthService
  ) { 
    const randomIndex = Math.floor(Math.random() * this.listErrorMessages.length);
    this.currentErrorMessage =  this.listErrorMessages[randomIndex];
  }

  ngOnInit(): void {
    const randomIndex = Math.floor(Math.random() * this.listErrorMessages.length);
    this.currentErrorMessage =  this.listErrorMessages[randomIndex]; 
  }

}
