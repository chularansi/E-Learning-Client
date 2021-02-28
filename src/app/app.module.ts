import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { AppRoutingModule } from './app-routing.module';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { CommonModule } from '@angular/common';

import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { NavHeaderComponent } from './components/nav-header/nav-header.component';
import { NavSideComponent } from './components/nav-side/nav-side.component';
import { FooterComponent } from './components/footer/footer.component';
import { TokenInterceptorService } from './services/token-interceptor.service1';
import { LinkComponent } from './components/link/link.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { AuthModule } from './components/auth/auth.module';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    NavHeaderComponent,
    NavSideComponent,
    FooterComponent,
    LinkComponent,
    NotFoundComponent
  ],
  imports: [
    BrowserModule,
    CommonModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,
    ToastrModule.forRoot(),
    AuthModule,
    AppRoutingModule,
  ],
  providers: [
    { provide: HTTP_INTERCEPTORS, useClass: TokenInterceptorService, multi: true }
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
