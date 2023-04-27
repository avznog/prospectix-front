import { Component, Input, OnInit } from '@angular/core';
import { NgxSmartModalService } from 'ngx-smart-modal';

@Component({
  selector: 'app-action-prospect',
  templateUrl: './action-prospect.component.html',
  styleUrls: ['./action-prospect.component.scss']
})
export class ActionProspectComponent implements OnInit {
  constructor(
    public readonly ngxSmartModalService: NgxSmartModalService
  ) {
  }

  ngOnInit(): void {
    console.log(this.ngxSmartModalService.getModalData('action-prospect'))
  }

}
