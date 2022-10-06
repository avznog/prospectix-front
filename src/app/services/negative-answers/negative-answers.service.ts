import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateNegativeAnswerDto } from 'src/app/dto/negative-answers/create-negative-answer.dto';
import { NegativeAnswer } from 'src/app/models/negative-answer.model';

@Injectable({
  providedIn: 'root'
})
export class NegativeAnswersService {

  allMyNegativeAnswers: number = 0;
  constructor(
    private http: HttpClient
  ) { 
    this.countAllForMe();
  }

  createForMe(createNegativeAnswerDto: CreateNegativeAnswerDto) {
    this.http.post<NegativeAnswer>(`negative-answers/create-for-me`, createNegativeAnswerDto).subscribe(() => this.allMyNegativeAnswers += 1);
  }

  countAllForMe() {
    this.http.get<number>(`negative-answers/count-all-for-me`).subscribe(allMyNegativeAnswers => this.allMyNegativeAnswers = allMyNegativeAnswers);
  }
}
