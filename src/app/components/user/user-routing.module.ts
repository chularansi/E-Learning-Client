import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { AuthGuard } from 'src/app/guards/auth.guard';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserSettingComponent } from './user-setting/user-setting.component';

const routes: Routes = [
  { path: 'user-profile', component: UserProfileComponent, canActivate: [AuthGuard] },
  { path: 'user-setting', component: UserSettingComponent, canActivate: [AuthGuard] },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class UserRoutingModule { }
