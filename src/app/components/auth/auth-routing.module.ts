import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { ForgotPasswordComponent } from './forgot-password/forgot-password.component';
import { LoginComponent } from './login/login.component';
import { LogoutComponent } from './logout/logout.component';
import { RegisterComponent } from './register/register.component';
import { ResetPasswordComponent } from './reset-password/reset-password.component';
import { TwoStepVerificationComponent } from './two-step-verification/two-step-verification.component';

const routes: Routes = [
  {
    path: 'auth', children: [
      { path: 'register', component: RegisterComponent },
      { path: 'login', component: LoginComponent },
      { path: 'logout', component: LogoutComponent },
      { path: 'forgot-pwd', component: ForgotPasswordComponent },
      { path: 'reset-pwd', component: ResetPasswordComponent },
      { path: 'two-step-verification', component: TwoStepVerificationComponent },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AuthRoutingModule { }
