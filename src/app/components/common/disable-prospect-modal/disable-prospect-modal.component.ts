import { Component, Input, OnInit } from '@angular/core';
import { ReasonDisabledType } from 'src/app/constants/reasonDisabled.type';
import { Prospect } from 'src/app/models/prospect.model';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';

@Component({
  selector: 'app-disable-prospect-modal',
  templateUrl: './disable-prospect-modal.component.html',
  styleUrls: ['./disable-prospect-modal.component.scss']
})
export class DisableProspectModalComponent implements OnInit {

  @Input() prospect!: Prospect;
  reasonDisabledType = [ReasonDisabledType.ENTREPRISE_FERMEE, ReasonDisabledType.GRAND_GROUPE, ReasonDisabledType.MAL_ATTRIBUE];
  reason: ReasonDisabledType = ReasonDisabledType.MAL_ATTRIBUE;
  constructor(
    private readonly prospectService: ProspectsService
  ) { }

  ngOnInit(): void {
    this.reason = ReasonDisabledType.MAL_ATTRIBUE;
  }

  onDisableProspect() {
    console.log(this.reason)
    this.prospectService.disable(this.prospect.id, this.reason);
  }

}
