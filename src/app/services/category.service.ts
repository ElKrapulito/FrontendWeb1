import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { environment } from 'src/environments/environment';
import { Category } from '../interfaces/category';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {

  constructor(
    private http:HttpClient
  ) { }

  url = `${environment.apiUrl}/category`;

  getCategories(){
    return this.http.get<Category[]>(this.url);
  }

}
