import { Component, OnInit } from '@angular/core';
import { CategoryService } from '../services/category.service';
import { Category } from '../interfaces/category';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {

  constructor(
    private categoryService: CategoryService
  ) { }

  ngOnInit(): void {
    this.getCategories();
  }

  categories: Category[]
  getCategories() {
    this.categoryService.getCategories()
      .subscribe(
        categories => {
          this.categories = categories;
        }
      );
  }

}
