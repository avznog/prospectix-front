import { Component, OnInit } from '@angular/core';
import { ChangelogsService } from 'src/app/services/changelogs/changelogs.service';

@Component({
  selector: 'app-changelogs',
  templateUrl: './changelogs.component.html',
  styleUrls: ['./changelogs.component.scss']
})
export class ChangelogsComponent implements OnInit {

  constructor(
    public readonly changelogsService: ChangelogsService
  ) { }

  ngOnInit(): void {
  }

}
