import { Component, Input, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { CategoryService } from 'src/app/services/category.service';

@Component({
  selector: 'app-add-edit-category',
  templateUrl: './add-edit-category.component.html',
  styleUrls: ['./add-edit-category.component.css']
})
export class AddEditCategoryComponent implements OnInit {
  @Input() category!: Category;
  categoryId!: number;
  categoryName!: string;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.categoryId = this.category.id;
    this.categoryName = this.category.categoryName;
  }

  addCategory(): void {
    const newCategory: Category = {
      id: this.categoryId,
      categoryName: this.categoryName
    };

    this.categoryService.addCategory(newCategory).subscribe(
      (res: any) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }

  updateCategory(): void {
    const updateCategory: Category = {
      id: this.categoryId,
      categoryName: this.categoryName
    };

    this.categoryService.updateCategory(updateCategory).subscribe(
      (res: any) => {
        console.log(res);
      },
      (err) => {
        console.log(err);
      }
    );
  }
}
