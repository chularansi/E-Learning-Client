import { NgModule } from '@angular/core';

import { UserRoutingModule } from './user-routing.module';
import { UserProfileComponent } from './user-profile/user-profile.component';
import { UserSettingComponent } from './user-setting/user-setting.component';
import { UserChangePasswordComponent } from './user-change-password/user-change-password.component';
import { SharedModule } from 'src/app/shared/shared.module';


@NgModule({
  declarations: [UserProfileComponent, UserSettingComponent, UserChangePasswordComponent],
  imports: [
    SharedModule,
    UserRoutingModule
  ]
})
export class UserModule { }
