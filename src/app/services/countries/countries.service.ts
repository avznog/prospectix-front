import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { CreateCountryDto } from 'src/app/dto/countries/create-country.dto';
import { Country } from 'src/app/models/country.model';

@Injectable({
  providedIn: 'root'
})
export class CountriesService {

  countries: Country[] = [];
  constructor(
    private http: HttpClient
  ) { 
    this.findAll().subscribe(countries => this.countries = countries);
  }

  findAll() {
    return this.http.get<Country[]>("countries");
  }

  add(createCountryDto: CreateCountryDto) {
    return this.http.post<Country>("countries/add", createCountryDto).subscribe(country => this.countries.push(country));
  }
}
