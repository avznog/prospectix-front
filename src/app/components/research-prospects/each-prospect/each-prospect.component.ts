import { Component, Input, OnInit } from '@angular/core';
import { Prospect } from 'src/app/models/prospect.model';

@Component({
  selector: 'app-each-prospect',
  templateUrl: './each-prospect.component.html',
  styleUrls: ['./each-prospect.component.scss']
})
export class EachProspectComponent implements OnInit {
  @Input() prospect!: Prospect;
  constructor() { }

  ngOnInit(): void {
  }

}
