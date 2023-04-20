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
  citiesByZipcode: City[] = [];
  
  constructor(
    private http: HttpClient,
    private readonly toastsService: ToastsService
  ) {
    this.findAll()
    this.findAllByZipcode()
   }

  findAll() {
    return this.http.get<[City]>(`cities/find-all`).subscribe(cities => {
      this.cities = cities.filter((city, index, array) => array.findIndex((c) => c.name === city.name) === index)
    })
  }

  findAllByZipcode() {
    return this.http.get<[City]>(`cities/find-all-by-zipcode`).subscribe(citiesByZipcode => {
      this.citiesByZipcode = citiesByZipcode;
    })
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
