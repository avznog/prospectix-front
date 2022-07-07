import { Component, OnInit } from '@angular/core';
import { Prospect } from 'src/app/models/prospect.model';
import { ProspectsService } from 'src/app/services/prospects/prospects.service';

@Component({
  selector: 'app-list-prospects',
  templateUrl: './list-prospects.component.html',
  styleUrls: ['./list-prospects.component.scss']
})
export class ListProspectsComponent implements OnInit {
  prospects!: Prospect[];
  constructor(
    private readonly prospectsService: ProspectsService
  ) { }

  ngOnInit(): void {
    this.prospectsService.findAll().subscribe({
      next: (data) => {
        console.log(data)
        this.prospects = data;
      },
      error: (err) => {
        console.log(err);
      }
    })
  }

}
