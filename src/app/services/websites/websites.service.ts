import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Prospect } from 'src/app/models/prospect.model';
import { Website } from 'src/app/models/website.model';
import { ProspectsService } from '../prospects/prospects.service';

@Injectable({
  providedIn: 'root'
})
export class WebsitesService {

  constructor(
    private http: HttpClient,
    private prospectsService: ProspectsService
  ) { }
  
  update(prospect: Prospect, website: Website) {
    return this.http.patch<Website>(`websites/${website.id}`, website).subscribe(() => this.prospectsService.prospects.set(prospect.id, { ...this.prospectsService.prospects.get(prospect.id)!, website: website }));
  }
}
