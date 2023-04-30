import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { UpdateSearchParamsDto } from 'src/app/dto/search-params/update-search-params.dto';
import { SearchParams } from 'src/app/models/search-params.model';

@Injectable({
  providedIn: 'root'
})
export class SearchParamsService {

  searchParams: SearchParams = {} as SearchParams;

  constructor(
    private http: HttpClient
  ) {
    this.findAll()
   }

  findAll() {
    return this.http.get<SearchParams[]>(`search-params/`).subscribe(searchParams => {
      searchParams.forEach(searchParams => this.searchParams = searchParams)
    });
  }

  update(id: number, updateSearchParamsDto: UpdateSearchParamsDto) {
    this.http.patch(`search-params/${id}`, updateSearchParamsDto).subscribe(() => this.searchParams = {...this.searchParams, ...updateSearchParamsDto});
  }
}
