import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { CreateCityDto } from 'src/app/dto/cities/create-city.dto';
import { City } from 'src/app/models/city.model';
import { ToastsService } from '../toasts/toasts.service';

@Injectable({
  providedIn: 'root'
})
export class CitiesService {

  cities: City[] = [];
  constructor(
    private http: HttpClient,
    private readonly toastsService: ToastsService
  ) {
    this.findAll().subscribe(cities => this.cities = cities)
   }

  findAll() {
    return this.http.get<City[]>("cities");
  }

  create(createCityDto: CreateCityDto) {
    return this.http.post<City>("cities/add", createCityDto).subscribe(city => {
      this.cities.push(city)
      this.toastsService.addToast({
        type: "alert-success",
        message: `${city.name} : ${city.zipcode} ajoutée`
      })
    });
  }
}
