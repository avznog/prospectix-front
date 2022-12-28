import { Component, OnInit } from '@angular/core';
import { GoogleService } from 'src/app/services/google/google.service';

@Component({
  selector: 'app-oauth2callback',
  templateUrl: './oauth2callback.component.html',
  styleUrls: ['./oauth2callback.component.scss']
})
export class Oauth2callbackComponent implements OnInit {

  constructor(
    public readonly googleService: GoogleService
  ) { }

  ngOnInit(): void {
    this.googleService.oauth2callback(window.location.href.split("?code=")[1]);
  }

}
