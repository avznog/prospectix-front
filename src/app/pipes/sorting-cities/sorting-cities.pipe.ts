import { Pipe, PipeTransform } from '@angular/core';
import { City } from 'src/app/models/city.model';

@Pipe({
  name: 'sortingCities'
})
export class SortingCitiesPipe implements PipeTransform {

  transform(cities: City[], zone: string, ...args: unknown[]): City[] {
    return cities.filter(city => city.name == zone);
  }

}
