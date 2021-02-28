import { Component, OnInit } from '@angular/core';
import { Category } from 'src/app/models/category';
import { ModalDialog } from 'src/app/models/modal-dialog';
import { CategoryService } from 'src/app/services/category.service';
import { Pagination } from 'src/app/shared/pagination/pagination';

@Component({
  selector: 'app-show-category',
  templateUrl: './show-category.component.html',
  styleUrls: ['./show-category.component.css']
})
export class ShowCategoryComponent implements OnInit {
  title = '';
  ActivateAddEditCategory = false;
  category!: Category;
  confirmValue = false;

  selectedCategory: Category = {
    id: 0,
    categoryName: ''
  };

  modalDialog: ModalDialog = {
    title: 'Delete Category',
    description: '',
    ok: 'Yes',
    cancel: 'No'
  };

  categories!: Category[];
  pagination!: Pagination;
  pageNumber = 1;
  pageSize = 5;

  constructor(private categoryService: CategoryService) { }

  ngOnInit(): void {
    this.loadCategories();
  }

  addCategory(): void {
    this.category = {
      id: 0,
      categoryName: ''
    };

    this.title = 'Add Category';
    this.ActivateAddEditCategory = true;
  }

  closeClick(): void {
    this.ActivateAddEditCategory = false;
    this.loadCategories();
  }

  editCategory(category: Category): void {
    this.category = category;
    this.title = 'Edit Category';
    this.ActivateAddEditCategory = true;
  }

  deleteCategory(category: Category): void {
    this.selectedCategory = {
      id: category.id, categoryName: category.categoryName
    };

    this.modalDialog.description = `Are you sure to delete this category: ${this.selectedCategory.categoryName}`;
    // console.log(this.selectedCategory);
  }

  onConfirm(confirm: any): void {
    if (confirm) {
      this.categoryService.deleteCategory(this.selectedCategory.id).subscribe(
        (res: any) => {
          console.log(res);
          console.log(`Category: ${this.selectedCategory.categoryName} is deleted`);
          this.loadCategories();
        },
        (err) => {
          console.log(err);
        }
      );
    }
  }

  clickPage(page: number): void {
    if (page === this.pageNumber) { return; }
    this.pageNumber = page;
    this.loadCategories();
  }

  loadCategories(): void {
    this.categoryService.getCategories(this.pageNumber, this.pageSize).subscribe((res: { result: Category[]; pagination: Pagination; }) => {
      this.categories = res.result;
      this.pagination = res.pagination;
    });
  }

  range(start: number, end: number): any[] {
    const arr = [];
    for (let i = start; i <= end; i++) {
        arr.push(i);
    }
    return arr;
  }
}
