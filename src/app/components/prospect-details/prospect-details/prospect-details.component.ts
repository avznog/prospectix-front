import { Component, Input, OnInit } from '@angular/core';
import { Prospect } from 'src/app/models/prospect.model';

@Component({
  selector: 'app-prospect-details',
  templateUrl: './prospect-details.component.html',
  styleUrls: ['./prospect-details.component.scss']
})
export class ProspectDetailsComponent implements OnInit {

  @Input() prospect!: Prospect;
  constructor() { }

  ngOnInit(): void {
    this.prospect = {
      id: 0,
      companyName: "Tibermont Antiquites 2",
      comment: "Prospect très réactif",
      disabled: false,
      nbNo: 0,
      streetAddress: "rue de la Paix",
      activity: {
        id: 0,
        name: "Recouvrement de créances"
      },
      city: {
        id: 0,
        name: "Paris",
        zipcode: 75014
      },
      country: {
        id: 0,
        name: "France",
      },
      phone: {
        id: 0,
        number: "06 84 65 34 54"
      },
      website: {
        id: 0,
        website: "www.tibermontantiquites2.com"
      },
      email: {
        id: 0,
        email: "tibermont@antiquites2.com"
      },
      meetings: [],
      reminders: [],
      events: [],
      bookmarks: []
    }
  }

}
