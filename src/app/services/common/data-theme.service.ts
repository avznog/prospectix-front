import { Injectable } from '@angular/core';
import { Observable, Subject } from 'rxjs';
import { StatisticsService } from '../statistics/statistics.service';

@Injectable({
  providedIn: 'root'
})
export class DataThemeService {
  private subject = new Subject<any>();
  dataTheme : string = "";
  primaryColorsForCharts = new Map<string, string>();
  secondaryColorsForCharts = new Map<string, string>();
  primary: string = "";
  secondary: string = "";
  constructor(
    private readonly statisticsService: StatisticsService
  ) {
    this.getData().subscribe(data => {
      localStorage.setItem("theme",data)
      this.dataTheme = data

    });
    this.setPrimaryColors();
    this.setSecondaryColors();
  }

  sendData(message: string) {
      this.subject.next(message);
      this.primary = this.primaryColorsForCharts.get(message) ?? "jisep"
      this.secondary = this.secondaryColorsForCharts.get(message) ?? "jisep"
      this.statisticsService.updateAllCharts(this.primary, this.secondary);
      
  }

  getData(): Observable<any> {
      return this.subject.asObservable();
  }

  setPrimaryColors() {
    this.primaryColorsForCharts.set("aqua","#09ecf3")
    this.primaryColorsForCharts.set("black","#343232")
    this.primaryColorsForCharts.set("bumblebee","#e0a82e")
    this.primaryColorsForCharts.set("cmyk","#45AEEE")
    this.primaryColorsForCharts.set("corporate","#4b6bfb")
    this.primaryColorsForCharts.set("cupcake","#65c3c8")
    this.primaryColorsForCharts.set("cyberpunk","#ff7598")
    this.primaryColorsForCharts.set("dark","#661AE6")
    this.primaryColorsForCharts.set("dracula","#ff79c6")
    this.primaryColorsForCharts.set("emerald","#66cc8a")
    this.primaryColorsForCharts.set("fantasy","#6e0b75")
    this.primaryColorsForCharts.set("forest","#1eb854")
    this.primaryColorsForCharts.set("garden","#5c7f67")
    this.primaryColorsForCharts.set("halloween","#f28c18")
    this.primaryColorsForCharts.set("light","#570df8")
    this.primaryColorsForCharts.set("lofi","#0D0D0D")
    this.primaryColorsForCharts.set("luxury","#ffffff")
    this.primaryColorsForCharts.set("pastel","#d1c1d7")
    this.primaryColorsForCharts.set("retro","#ef9995")
    this.primaryColorsForCharts.set("synthwave","#e779c1")
    this.primaryColorsForCharts.set("valentine","#e96d7b")
    this.primaryColorsForCharts.set("wireframe","#b8b8b8")
    this.primaryColorsForCharts.set("autumn","#8C0327")
    this.primaryColorsForCharts.set("business","#1C4E80")
    this.primaryColorsForCharts.set("acid","#FF00F4")
    this.primaryColorsForCharts.set("lemonade","#519903")
    this.primaryColorsForCharts.set("night","#38bdf8")
    this.primaryColorsForCharts.set("coffee","#DB924B")
    this.primaryColorsForCharts.set("winter","#047AFF")
    this.primaryColorsForCharts.set("jisep","#6d61a8")
  
  }
  setSecondaryColors() {
    this.secondaryColorsForCharts.set("aqua","#966fb3")
    this.secondaryColorsForCharts.set("black","#343232")
    this.secondaryColorsForCharts.set("bumblebee","#f9d72f")
    this.secondaryColorsForCharts.set("cmyk","#E8488A")
    this.secondaryColorsForCharts.set("corporate","#7b92b2")
    this.secondaryColorsForCharts.set("cupcake","#ef9fbc")
    this.secondaryColorsForCharts.set("cyberpunk","#75d1f0")
    this.secondaryColorsForCharts.set("dark","#D926AA")
    this.secondaryColorsForCharts.set("dracula","#bd93f9")
    this.secondaryColorsForCharts.set("emerald","#377cfb")
    this.secondaryColorsForCharts.set("fantasy","#007ebd")
    this.secondaryColorsForCharts.set("forest","#1fd65f")
    this.secondaryColorsForCharts.set("garden","#ecf4e7")
    this.secondaryColorsForCharts.set("halloween","#6d3a9c")
    this.secondaryColorsForCharts.set("light","#f000b8")
    this.secondaryColorsForCharts.set("lofi","#1A1919")
    this.secondaryColorsForCharts.set("luxury","#152747")
    this.secondaryColorsForCharts.set("pastel","#f6cbd1")
    this.secondaryColorsForCharts.set("retro","#a4cbb4")
    this.secondaryColorsForCharts.set("synthwave","#58c7f3")
    this.secondaryColorsForCharts.set("valentine","#a991f7")
    this.secondaryColorsForCharts.set("wireframe","#b8b8b8")
    this.secondaryColorsForCharts.set("autumn","#D85251")
    this.secondaryColorsForCharts.set("business","#7C909A")
    this.secondaryColorsForCharts.set("acid","#FF7400")
    this.secondaryColorsForCharts.set("lemonade","#E9E92E")
    this.secondaryColorsForCharts.set("night","#818CF8")
    this.secondaryColorsForCharts.set("coffee","#263E3F")
    this.secondaryColorsForCharts.set("winter","#463AA2")
    this.secondaryColorsForCharts.set("jisep","#F04E2D")
  }
  
}
