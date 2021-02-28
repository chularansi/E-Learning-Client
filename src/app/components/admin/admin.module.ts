import { NgModule } from '@angular/core';

import { AdminRoutingModule } from './admin-routing.module';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { CategoryComponent } from './category/category.component';
import { SubjectComponent } from './subject/subject.component';
import { CustomComponentModule } from 'src/app/custom-components/custom-component.module';
import { AdminComponent } from './admin.component';
import { ShowCategoryComponent } from './category/show-category/show-category.component';
import { AddEditCategoryComponent } from './category/add-edit-category/add-edit-category.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [AdminHomeComponent, CategoryComponent, SubjectComponent, AdminComponent, ShowCategoryComponent, AddEditCategoryComponent],
  imports: [
    SharedModule,
    AdminRoutingModule,
    CustomComponentModule
  ]
})
export class AdminModule { }
