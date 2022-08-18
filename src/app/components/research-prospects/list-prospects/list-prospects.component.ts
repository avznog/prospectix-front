import { Component, OnInit } from '@angular/core';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';

@Component({
  selector: 'app-list-prospects',
  templateUrl: './list-prospects.component.html',
  styleUrls: ['./list-prospects.component.scss']
})
export class ListProspectsComponent implements OnInit {
  constructor(
    public prospectsService: ProspectsService
  ) { }

  ngOnInit(): void {
  }
}
