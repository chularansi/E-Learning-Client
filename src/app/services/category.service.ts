import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Category } from '../models/category';
import { PaginatedResult } from '../shared/pagination/pagination';

@Injectable({
  providedIn: 'root'
})
export class CategoryService {
  private baseUrl = 'https://localhost:44325/api/categories';
  categories: Category[] = [];
  paginatedResult: PaginatedResult<Category[]> = new PaginatedResult<Category[]>();

  constructor(private http: HttpClient) { }

  getCategories(page?: number, itemsPerPage?: number): Observable<PaginatedResult<Category[]>> {
    let params = new HttpParams();

    if (page && itemsPerPage !== null) {
      params = params.append('pageNumber', String(page));
      params = params.append('pageSize', String(itemsPerPage));
    }

    return this.http.get<any>(`${this.baseUrl}`, {observe: 'response', params}).pipe(
      map(response => {
        this.paginatedResult.result = response.body;
        if (response.headers.get('Pagination') !== null) {
          this.paginatedResult.pagination = JSON.parse(String(response.headers.get('Pagination')));
        }

        return this.paginatedResult;
      })
    );
  }

  deleteCategory(id: number) {
    return this.http.delete(`${this.baseUrl}/${id}`);
  }
  // deleteCategory(id: number): Observable<void> {
  //   console.log('delete');
  //   return this.http.delete<void>(`${this.baseUrl}/${id}`);
  // }

  addCategory(category: Category) {
    console.log(category);
    return this.http.post(`${this.baseUrl}`, category);
  }

  updateCategory(category: Category) {
    return this.http.put(`${this.baseUrl}/${category.id}`, category);
  }
}
