import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Chart } from 'chart.js';
import { CreateCallDto } from 'src/app/dto/calls/create-call.dto';
import { CreateNegativeAnswerDto } from 'src/app/dto/negative-answers/create-negative-answer.dto';
import { Call } from 'src/app/models/call.model';
import { NegativeAnswer } from 'src/app/models/negative-answer.model';
import { SlackService } from '../slack/slack.service';

@Injectable({
  providedIn: 'root'
})
export class StatisticsService {
  currentPage: string = "my-stats"
  startDateForChartsInterval: string = "2022-11-07T00:00:00.000Z";
  endDateForChartsInterval: string = new Date().toISOString();
  //! Personnal stats
  allMyReminders: number = 0;
  allMyCalls: number = 0;
  allMyNegativeAnswers: number = 0;
  allMyMeetings: number = 0;
  allMySentEmails: number = 0;

  //! Personnal weekly stats
  weeklyCalls: number = 0;
  weeklyReminders: number = 0;
  weeklyMeetings: number = 0;
  weeklyNegativeAnswers: number = 0;
  weeklySentEmails: number = 0;

  //! Personnal history stats
  byWeeksScale: {dateDown: Date, dateUp: Date}[] = [{dateDown: new Date, dateUp: new Date}];
  byWeeksCalls: [number] = [0]
  byWeeksReminders: [number] = [0]
  byWeeksMeetings: [number] = [0]
  byWeeksNegativeAnswers: [number] = [0]
  byWeeksSentEmails: [number] = [0]
  
  //! All stats
  // all calls
  allCallsCount: [number] = [0];
  allCallsPseudo: [string] = [""];

  //! All Data for every one stats (activity page)
  allCallsForEveryone: {labels: string[], datasets: [{label: string, data: number[]}]} = {labels: ["lao","ding","data","..."], datasets: [{ label: "data is laoding...", data: [1,2,3,2,4]}]}
  allMeetingsForEveryone: {labels: string[], datasets: [{label: string, data: number[]}]} = {labels: ["lao","ding","data","..."], datasets: [{ label: "data is laoding...", data: [1,2,3,2,4]}]}

  // all reminders
  allRemindersCount: [number] = [0];
  allRemindersPseudo: [string] = [""];

  //all meetings
  allMeetingsCount : [number] = [0];
  allMeetingsPseudo: [string] = [""];

  //all Sent Emails
  allSentEmailsCount : [number] = [0];
  allSentEmailsPseudo : [string] = [""];

  //for radara chart
  allStatsLoaded: boolean[] = [false, false, false, false];
  dataForRadar: {labels: string[], datasets: [{label: string, data: number[]}]} = {labels: ["Appels","Rappels","Rendez-vous","Mails"], datasets: [{ label: "data is laoding...", data: [1,2,3,4]}]}

  //! Charts
  allCallsChart: any;
  allRemindersChart: any;
  allMeetingsChart: any;
  allSentEmailsChart: any;
  pieChartAllCalls: any;
  allCallsEveryoneLineChart: any;
  allMeetingsEveryoneLineChart: any;
  allDataForEveryoneRadarChart: any;
  primaryColor: string = "";
  secondaryColor: string = "";

  constructor(
    private http: HttpClient,
    private router: Router,
    private readonly slackService: SlackService
  ) {
     // ! Weekly stats
     this.countWeeklyCallsForMe();
     this.countWeeklyMeetingsForMe();
     this.countWeeklyRemindersForMe();
     this.countWeeklyNegativeAnswersForMe();
     this.countWeeklySentEmailsForMe();
 
     //! All stats
     this.countAllCallsForMe();
     this.countAllNegativeAnswersForMe();
     this.countAllRemindersForMe();
     this.countAllMeetingsForMe();
     this.countAllSentEmailsForMe();
 
     //! History stats (by weeks)
     this.countByWeeksCalls();
     this.countByWeeksReminders();
     this.countByWeeksMeetings();
     this.countByWeeksSentEmails();
     this.countByWeeksNegativeAnswers();
  }

  //  * Getting the separate count since the last sunday
  countWeeklyCallsForMe() {
    return this.http.get<number>(`calls/count-weekly-for-me`).subscribe(weeklyCalls => this.weeklyCalls = weeklyCalls);
  }

  countWeeklyMeetingsForMe() {
    return this.http.get<number>(`meetings/count-weekly-for-me`).subscribe(weeklyMeetings => this.weeklyMeetings = weeklyMeetings);
  }

  countWeeklyRemindersForMe() {
    return this.http.get<number>(`reminders/count-weekly-for-me`).subscribe(weeklyReminders => this.weeklyReminders = weeklyReminders);
  }

  countWeeklySentEmailsForMe() {
    return this.http.get<number>(`sent-emails/count-weekly-for-me`).subscribe(weeklySentEmails => this.weeklySentEmails = weeklySentEmails);
  }

  countWeeklyNegativeAnswersForMe() {
    return this.http.get<number>(`negative-answers/count-weekly-for-me`).subscribe(weeklyNegativeAnswers => this.weeklyNegativeAnswers = weeklyNegativeAnswers);
  }

  //* Getting the separate count since the beginning of the year for all data
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

  countByWeeksCalls() {
    return this.http.get<{intervals: [{dateDown: Date, dateUp: Date}], data: [number]}>(`calls/count-all-by-weeks-for-me`).subscribe(data => {
      this.byWeeksCalls.pop();
      this.byWeeksScale.pop();
      this.byWeeksScale = data.intervals.reverse();
      this.byWeeksCalls = data.data;
    })
  }
  countByWeeksReminders() {
    return this.http.get<{intervals: [{dateDown: Date, dateUp: Date}], data: [number]}>(`reminders/count-all-by-weeks-for-me`).subscribe(data => {
      this.byWeeksReminders.pop();
      this.byWeeksReminders = data.data;
    })
  }

  countByWeeksMeetings() {
    return this.http.get<{intervals: [{dateDown: Date, dateUp: Date}], data: [number]}>(`meetings/count-all-by-weeks-for-me`).subscribe(data => {
      this.byWeeksMeetings.pop();
      this.byWeeksMeetings = data.data;
    })
  }

  countByWeeksSentEmails() {
    return this.http.get<{intervals: [{dateDown: Date, dateUp: Date}], data: [number]}>(`sent-emails/count-all-by-weeks-for-me`).subscribe(data => {
      this.byWeeksSentEmails.pop();
      this.byWeeksSentEmails = data.data;
    })
  }

  countByWeeksNegativeAnswers() {
    return this.http.get<{intervals: [{dateDown: Date, dateUp: Date}], data: [number]}>(`negative-answers/count-all-by-weeks-for-me`).subscribe(data => {
      this.byWeeksNegativeAnswers.pop();
      this.byWeeksNegativeAnswers = data.data;
    })
  }

  // ! Data for graphs
  //? All calls
  countAllCalls(interval: { dateDown: Date, dateUp: Date }) {
    let queryParameters = new HttpParams();
    if (interval) {
      queryParameters = queryParameters.append("dateDown", interval.dateDown.toISOString());
      queryParameters = queryParameters.append("dateUp", interval.dateUp.toISOString());
    }
    return this.http.get<[{ pseudo: string, count: number }]>(`calls/count-all`, { params: queryParameters }).subscribe(allCalls => {

      // reseting the data so the chart does not print X times
      this.allCallsCount = [0];
      this.allCallsPseudo = [""]
      this.allCallsCount.pop();
      this.allCallsPseudo.pop();
      allCalls = allCalls.sort((a,b) => (b.count - a.count))
      allCalls.forEach(call => {
        this.allCallsCount.push(call.count);
        this.allCallsPseudo.push(call.pseudo);
      }
      )
      // Calling the chart
      this.currentPage == 'ranking' && this.createAllCallsChart();
      
      this.currentPage == 'activity' && this.createPieChartAllCalls();

      this.currentPage == 'activity' && this.watchForAllStatsLoaded(0)

      });
  }

  //? all reminders
  countAllReminders(interval: { dateDown: Date, dateUp: Date }) {
    let queryParameters = new HttpParams();
    if (interval) {
      queryParameters = queryParameters.append("dateDown", interval.dateDown.toISOString());
      queryParameters = queryParameters.append("dateUp", interval.dateUp.toISOString());
    }
    return this.http.get<[{ pseudo: string, count: number}]>(`reminders/count-all`, { params: queryParameters }).subscribe(allReminders => {
      this.allRemindersCount = [0];
      this.allRemindersPseudo = [""];
      this.allRemindersCount.pop();
      this.allRemindersPseudo.pop();
      allReminders = allReminders.sort((a,b) => (b.count - a.count))
      allReminders.forEach(reminder => {
        this.allRemindersCount.push(reminder.count)
        this.allRemindersPseudo.push(reminder.pseudo)
      })
      this.currentPage == 'ranking' && this.createAllRemindersChart();
      this.currentPage == 'activity' && !this.allStatsLoaded[1] && this.watchForAllStatsLoaded(1)
    });
  }

  //? All meetings
  countAllMeetings(interval: { dateDown: Date, dateUp: Date }) {
    let queryParameters = new HttpParams();
    if (interval) {
      queryParameters = queryParameters.append("dateDown", interval.dateDown.toISOString());
      queryParameters = queryParameters.append("dateUp", interval.dateUp.toISOString());
    }
    return this.http.get<[{ pseudo: string, count: number }]>(`meetings/count-all`, { params: queryParameters }).subscribe(allMeetings => {

      // reseting the data so the chart does not print X times
      this.allMeetingsCount = [0];
      this.allMeetingsPseudo = [""]
      this.allMeetingsCount.pop();
      this.allMeetingsPseudo.pop();

      allMeetings = allMeetings.sort((a,b) => (b.count - a.count));
      allMeetings.forEach(meeting => {
        this.allMeetingsCount.push(meeting.count);
        this.allMeetingsPseudo.push(meeting.pseudo);
      }
      )
      // Calling the chart
      this.currentPage == 'ranking' && this.createAllMeetingsChart();
      this.currentPage == 'activity' && !this.allStatsLoaded[2] && this.watchForAllStatsLoaded(2)
    });
  }

  //? All mails
  countAllSentEmails(interval: { dateDown: Date, dateUp: Date }) {
    let queryParameters = new HttpParams();
    if (interval) {
      queryParameters = queryParameters.append("dateDown", interval.dateDown.toISOString());
      queryParameters = queryParameters.append("dateUp", interval.dateUp.toISOString());
    }
    return this.http.get<[{ pseudo: string, count: number }]>(`sent-emails/count-all`, { params: queryParameters }).subscribe(allSentEmails => {

      // reseting the data so the chart does not print X times
      this.allSentEmailsCount = [0];
      this.allSentEmailsPseudo = [""]
      this.allSentEmailsCount.pop();
      this.allSentEmailsPseudo.pop();
      
      allSentEmails = allSentEmails.sort((a,b) => (b.count - a.count))
      allSentEmails.forEach(sentEmail => {
        this.allSentEmailsCount.push(sentEmail.count);
        this.allSentEmailsPseudo.push(sentEmail.pseudo);
      }
      )
      // Calling the chart
      this.currentPage == 'ranking' && this.createAllSentEmailsChart();
      this.currentPage == 'activity' && !this.allStatsLoaded[3] && this.watchForAllStatsLoaded(3)
    });
  }

  //? gettings all Calls for everyone
  countAllCallsForEveryOne() {
    return this.http.get<{labels: [string], datasets: [{label: string, data: [number]}]}>(`calls/count-all-for-everyone`).subscribe(allCallsForEveryone => {
      this.allCallsForEveryone = allCallsForEveryone
      this.createAllCallForEveryoneChart()
    })
  }

  //? gettings all meetings for everyone
  countAllMeetingsForEveryOne() {
    return this.http.get<{labels: [string], datasets: [{label: string, data: [number]}]}>(`meetings/count-all-for-everyone`).subscribe(allMeetingsForEveryone => {
      this.allMeetingsForEveryone = allMeetingsForEveryone
      this.createAllMeetingsForEveryoneChart()
    })
  }
  

  // ! CREATION and INCREMENTATION of counts
  createNegativeAnswerForMe(createNegativeAnswerDto: CreateNegativeAnswerDto) {
    this.http.post<NegativeAnswer>(`negative-answers/create-for-me`, createNegativeAnswerDto).subscribe(() => {
      this.allMyNegativeAnswers += 1;
      this.weeklyNegativeAnswers += 1;
    });
  }

  createCallForMe(createCallDto: CreateCallDto) {
    // ! Check Fraud -> if fraud send slack notif
    let today = new Date();

    // ? Checking fraud on :  week day pas 20:00, saturday pas 18:00, sunday any Hour, any day before 08:00
    if(today.getDay() == 0 || (today.getDay() == 6 && today.getHours() > 18) || ((today.getDay() != 0 && today.getDay() != 6) && today.getHours() > 20) || today.getHours() < 8) {
      this.slackService.sendFraud(createCallDto.prospect)
    }
    this.http.post<Call>(`calls/create-for-me`, createCallDto).subscribe(() => {
      this.allMyCalls += 1
      this.weeklyCalls += 1;
    });
  }

  createReminderForMe() {
    this.allMyReminders += 1;
    this.weeklyReminders += 1;
  }

  createMeetingFroMe() {
    this.allMyMeetings += 1;
    this.weeklyMeetings += 1;
  }

  createSentEmailForMe() {
    this.allMySentEmails += 1;
    this.weeklyMeetings += 1;
  }

  //! Update charts
  updateAllCharts(primary: string, secondary: string) {
    
    (!this.allCallsChart && !this.allRemindersChart && !this.allMeetingsChart && !this.allSentEmailsChart) && (this.primaryColor = primary);
    (this.router.url != "statistics" && this.allRemindersChart && this.allCallsChart && this.allMeetingsChart && this.allSentEmailsChart) && (this.primaryColor = primary);

    this.allCallsChart && (this.allCallsChart.data.datasets[0].backgroundColor = primary);
    this.allCallsChart && this.allCallsChart.update();
    

    this.allRemindersChart && (this.allRemindersChart.data.datasets[0].backgroundColor = primary);
    this.allRemindersChart &&  this.allRemindersChart.update()

    this.allMeetingsChart && (this.allMeetingsChart.data.datasets[0].backgroundColor = primary);
    this.allMeetingsChart &&  this.allMeetingsChart.update()
    
    this.allSentEmailsChart && (this.allSentEmailsChart.data.datasets[0].backgroundColor = primary);
    this.allSentEmailsChart &&  this.allSentEmailsChart.update()
  }

  updateRankingChartsByDate(interval: {dateDown: Date, dateUp: Date}) {
    this.allCallsChart.destroy();
    this.allRemindersChart.destroy();
    this.allMeetingsChart.destroy();
    this.allSentEmailsChart.destroy();
    this.countAllCalls({ dateDown: new Date(interval.dateDown), dateUp: new Date(interval.dateUp) })
    this.countAllReminders({ dateDown: new Date(interval.dateDown), dateUp: new Date(interval.dateUp) })
    this.countAllMeetings({ dateDown: new Date(interval.dateDown), dateUp: new Date(interval.dateUp) })
    this.countAllSentEmails({ dateDown: new Date(interval.dateDown), dateUp: new Date(interval.dateUp) })
  }

  //! Charts
  //? Chart for all calls
  createAllCallsChart() {
     this.allCallsChart = new Chart("allCalls", {
      type: 'bar',
      data: {
        labels: this.allCallsPseudo,
        datasets: [
          {
            data: this.allCallsCount,
            backgroundColor: this.primaryColor,
            label: "Prospects contactés",
          },
        ]
      },
      options: {
        aspectRatio: 5,
      }
    });
  }

  //? Chart for all Reminders
  createAllRemindersChart() {
    this.allRemindersChart = new Chart("allReminders", {
      type: 'bar',

      data: {
        labels: this.allRemindersPseudo,
        datasets: [
          {
            data: this.allRemindersCount,
            backgroundColor: this.primaryColor,
            label: "Rappels créés"
          },
        ]
      },
      options: {
        aspectRatio: 5,
      }
    });
  }

  //? Chart for all Meetings
  createAllMeetingsChart() {
    this.allMeetingsChart = new Chart("allMeetings", {
      type: 'bar',

      data: {
        labels: this.allMeetingsPseudo,
        datasets: [
          {
            data: this.allMeetingsCount,
            backgroundColor: this.primaryColor,
            label: "Rendez-vous décrochés"
          },
        ]
      },
      options: {
        aspectRatio: 5,
      }
    });
  }

  //? Chart for all Sent Emails
  createAllSentEmailsChart() {
    this.allSentEmailsChart = new Chart("allSentEmails", {
      type: 'bar',

      data: {
        labels: this.allSentEmailsPseudo,
        datasets: [
          {
            data: this.allSentEmailsCount,
            backgroundColor: this.primaryColor,
            label: "Mails envoyés"
          },
        ]
      },
      options: {
        aspectRatio: 5,
      }
    });
  }

  //? Chart for dividing calls 
  createPieChartAllCalls() {
    this.pieChartAllCalls = new Chart("pieChartAllCalls", {
      type: 'doughnut',
      data: {
        labels: 
          this.allCallsPseudo,
        datasets: [{
          data: this.allCallsCount,
          hoverOffset: 4,
        }],
      },
      options: {
        aspectRatio: 2,
        plugins: {
          legend: {
            position: 'bottom'
          },
        }
      },
    });
  }

  //? Chart radar for all data for everyone
  createAllDataForEveryoneRadarChart() {
    this.allDataForEveryoneRadarChart = new Chart("allDataForEveryoneRadarChart", {
      type: "radar",
      data: this.dataForRadar,
      options: {
        aspectRatio: 2,
        plugins: {
          legend: {
            position: 'bottom'
          },
        }
      }
    })
  }

  //? Chart for call for everyone
  createAllCallForEveryoneChart() {
    this.allCallsEveryoneLineChart = new Chart("allCallsEveryoneLineChart", {
      type: "line",
      data: this.allCallsForEveryone,
      options: {
        aspectRatio: 5
      }
    })
  }

  //? Chart for meetings for everyone
  createAllMeetingsForEveryoneChart() {
    this.allMeetingsEveryoneLineChart = new Chart("allMeetingsEveryoneLineChart", {
      type: "line",
      data: this.allMeetingsForEveryone,
      options: {
        aspectRatio: 5
      }
    })
  }

  watchForAllStatsLoaded(id: number) {
    this.countAllReminders({ dateDown: new Date(this.startDateForChartsInterval), dateUp: new Date() });
    this.countAllMeetings({ dateDown: new Date(this.startDateForChartsInterval), dateUp: new Date() });
    this.countAllSentEmails({ dateDown: new Date(this.startDateForChartsInterval), dateUp: new Date() });
    this.allStatsLoaded[id] = true;
    for(let s of this.allStatsLoaded){
      if(!s){
        return
      }
    }
      this.dataForRadar.datasets = [{label: "", data: [9]}]
      this.dataForRadar.datasets.pop();
      let counter = 0;
      
      for(let pseudo of this.allCallsPseudo){
        this.dataForRadar.datasets.push({
          label: pseudo,
          data: [this.allCallsCount[counter], this.allRemindersCount[counter], this.allMeetingsCount[counter], this.allSentEmailsCount[counter]]
        })
        counter += 1
      }
      this.createAllDataForEveryoneRadarChart();
  }
}
