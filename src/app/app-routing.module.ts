import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { LinkComponent } from './components/link/link.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthGuard } from './guards/auth.guard';
import { CustomPreloadingService } from './services/custom-preloading.service';

const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'link', component: LinkComponent },
  { path: 'admin', data: { preload: false }, loadChildren: () => import('./components/admin/admin.module').then(m => m.AdminModule)},
  { path: 'user', data: { preload: true }, loadChildren: () => import('./components/user/user.module').then(m => m.UserModule)},
  { path: '404', component : NotFoundComponent },
  { path: '**', redirectTo: '/404', pathMatch: 'full'}
];

@NgModule({
  imports: [RouterModule.forRoot(routes, {preloadingStrategy: CustomPreloadingService})],
  exports: [RouterModule]
})
export class AppRoutingModule { }
