import { Component, Input, OnInit } from '@angular/core';
import { Prospect } from 'src/app/models/prospect.model';

@Component({
  selector: 'app-list-prospects',
  templateUrl: './list-prospects.component.html',
  styleUrls: ['./list-prospects.component.scss']
})
export class ListProspectsComponent implements OnInit {
  @Input() prospects!: Prospect[];
  constructor(
  ) { }

  ngOnInit(): void {
  }

}
