import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Subscription } from 'rxjs/internal/Subscription';
import { Website } from 'src/app/models/website.model';

@Injectable({
  providedIn: 'root'
})
export class WebsitesService {

  constructor(
    private http: HttpClient
  ) { }

  updateWebsite(idWebsite: number, website: { website: string }) : Subscription {
    return this.http.patch<Website>(`http://localhost:3000/websites/${idWebsite}`, website).subscribe();
  }
}
