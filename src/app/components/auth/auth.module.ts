import { NgModule } from '@angular/core';
import { SharedModule } from 'src/app/shared/shared.module';

import { AuthRoutingModule } from './auth-routing.module';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TwoStepVerificationComponent } from './two-step-verification/two-step-verification.component';
import { LogoutComponent } from './logout/logout.component';

@NgModule({
  declarations: [
    RegisterComponent,
    LoginComponent,
    ForgotPasswordComponent,
    ResetPasswordComponent,
    TwoStepVerificationComponent,
    LogoutComponent
  ],
  imports: [
    SharedModule,
    AuthRoutingModule
  ]
})
export class AuthModule { }
