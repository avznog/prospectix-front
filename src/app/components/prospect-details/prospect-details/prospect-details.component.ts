import { Component, Input, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { Activity } from 'src/app/models/activity.model';
import { City } from 'src/app/models/city.model';
import { Meeting } from 'src/app/models/meeting.model';
import { Prospect } from 'src/app/models/prospect.model';
import { Reminder } from 'src/app/models/reminder.model';
import { ActivitiesService } from 'src/app/services/activities/activities.service';
import { CitiesService } from 'src/app/services/cities/cities.service';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';

@Component({
  selector: 'app-prospect-details',
  templateUrl: './prospect-details.component.html',
  styleUrls: ['./prospect-details.component.scss']
})
export class ProspectDetailsComponent implements OnInit {

  @Input() prospect!: Prospect;
  @Input() currentProspectReminders!: Reminder[];
  @Input() currentProspectMeetings!: Meeting[];
  cities!: City[];  
  activities!: Activity[];
  formControlActivity!: FormControl;
  formControlCity!: FormControl;
  constructor(
    private prospectsService: ProspectsService,
    private citiesService: CitiesService,
    private activitiesService: ActivitiesService
  ) { }

  ngOnInit(): void {

    this.formControlCity = new FormControl(this.prospect.city.name, Validators.required);
    this.formControlActivity = new FormControl(this.prospect.activity.name, Validators.required);
    this.citiesService.findAll()
      .subscribe({
        next: (data) => {
          this.cities = data;
        },
        error: (err) => {
          console.log(err);
        }
      });

    this.activitiesService.findAll()
      .subscribe({
        next: (data) => {
          this.activities = data;
        },
        error: (err) => {
          console.log(err)
        }
      });
  }

  onChangeNbNo() {
    this.prospectsService.updateNbNo(this.prospect.id, { nbNo: this.prospect.nbNo + 1 })
  }

  onChangeActivity() {
   console.log("activity changed");
   this.prospectsService.updateByActivity(this.prospect.id, this.formControlActivity.value);
  }

  onChangeCity() {
    console.log("city changed")
    this.prospectsService.updateByCity(this.prospect.id, this.formControlCity.value);
  }

  onClickRefus() {
    this.prospectsService.disable(this.prospect.id);
  }
}
