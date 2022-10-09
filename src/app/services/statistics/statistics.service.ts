import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Chart } from 'chart.js';
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
  allCallsCount: [number] = [0];
  allCallsPseudo: [string] = [""];
  constructor(
    private http: HttpClient,
  ) {
    this.countAllCallsForMe();
    this.countAllNegativeAnswersForMe();
    this.countAllRemindersForMe();
    this.countAllMeetingsForMe();
    this.countAllSentEmailsForMe();
    
  }

  // * Getting the separate count since the beginning of the year for all data
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
    return this.http.get<number>(`calls/count-all-for-me`).subscribe(allMyCalls => this.allMyCalls = allMyCalls)
  }

  // * Data for graphs
  countAllCalls(interval: { dateDown: Date, dateUp: Date }) {
    let queryParameters = new HttpParams();
    if (interval) {
      queryParameters = queryParameters.append("dateDown", interval.dateDown.toISOString());
      queryParameters = queryParameters.append("dateUp", interval.dateUp.toISOString());
    }
    return this.http.get<[{ pseudo: string, count: number }]>(`calls/count-all`, { params: queryParameters }).subscribe((allCalls) => {

      // reseting the data so the chart does not print X times
      this.allCallsCount = [0];
      this.allCallsPseudo = [""]
      this.allCallsCount.pop();
      this.allCallsPseudo.pop();
      allCalls.forEach(call => {
        this.allCallsCount.push(call.count);
        this.allCallsPseudo.push(call.pseudo);
      }
      )

      // Calling the chart
      this.createAllCallsChart();
    });
  }

  // * CREATION and INCREMENTATION of counts
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

  // ! Charts
  // ? Chart for all calls
  createAllCallsChart() {
     new Chart("allCalls", {
      type: 'bar',

      data: {
        labels: this.allCallsPseudo,
        datasets: [
          {
            data: this.allCallsCount,
            backgroundColor: "blue",
            label: "Classement par nombre d'appels"
          },
        ]
      },
      options: {
        aspectRatio: 3.5,
      }
    });
  }
}
