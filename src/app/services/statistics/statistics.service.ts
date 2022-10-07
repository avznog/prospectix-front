import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateCallDto } from 'src/app/dto/calls/create-call.dto';
import { CreateNegativeAnswerDto } from 'src/app/dto/negative-answers/create-negative-answer.dto';
import { Call } from 'src/app/models/call.model';
import { NegativeAnswer } from 'src/app/models/negative-answer.model';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {

  allMyReminders: number = 0;
  allMyCalls: number = 0;
  allMyNegativeAnswers: number = 0;
  allMyMeetings: number = 0;
  allMySentEmails: number = 0;

  constructor(
    private http: HttpClient
  ) { 
    this.countAllCallsForMe();
    this.countAllNegativeAnswersForMe();
    this.countAllRemindersForMe();
    this.countAllMeetingsForMe();
    this.countAllSentEmailsForMe();
  }

  countAllRemindersForMe() {
    return this.http.get<number>(`reminders/count-all-for-me`).subscribe(allMyReminders => this.allMyReminders = allMyReminders);
  }

  countAllMeetingsForMe() {
    return this.http.get<number>(`meetings/count-all-for-me`).subscribe(allMyMeetings => this.allMyMeetings = allMyMeetings);
  }

  countAllNegativeAnswersForMe() {
    return this.http.get<number>(`negative-answers/count-all-for-me`).subscribe(allMyNegativeAnswers => this.allMyNegativeAnswers = allMyNegativeAnswers);
  }

  countAllSentEmailsForMe() {
    return this.http.get<number>(`sent-emails/count-all-for-me`).subscribe(allMySentEmails => this.allMySentEmails = allMySentEmails);
  }
  
  countAllCallsForMe() {
    return this.http.get<number>(`calls/count-all-for-me`).subscribe((allMyCalls) => this.allMyCalls = allMyCalls)
  }

  // CREATION
  createNegativeAnswerForMe(createNegativeAnswerDto: CreateNegativeAnswerDto) {
    this.http.post<NegativeAnswer>(`negative-answers/create-for-me`, createNegativeAnswerDto).subscribe(() => this.allMyNegativeAnswers += 1);
  }

  createCallForMe(createCallDto: CreateCallDto) {
    this.http.post<Call>(`calls/create-for-me`, createCallDto).subscribe(() => this.allMyCalls += 1);
  }

  createReminderForMe() {
    this.allMyReminders += 1;
  }

  createMeetingFroMe() {
    this.allMyMeetings += 1;
  }

  createSentEmailForMe() {
    this.allMySentEmails += 1;
  }
}
