import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { AdminHomeComponent } from './admin-home/admin-home.component';
import { AdminComponent } from './admin.component';
import { CategoryComponent } from './category/category.component';
import { SubjectComponent } from './subject/subject.component';

const routes: Routes = [
  { path: '', component: AdminComponent, children: [
      { path: '', redirectTo: 'home' },
      { path: 'home', component: AdminHomeComponent },
      { path: 'category', component: CategoryComponent },
      { path: 'subject', component: SubjectComponent }
    ]
  },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
