import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule } from '@angular/forms';
import {WebcamModule} from 'ngx-webcam';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { RegistrationComponent } from './registration/registration.component';
import { HomeComponent } from './home/home.component';
import { CameraComponent } from './camera/camera.component';
import { HttpClientModule } from '@angular/common/http';
import { SignaturePadModule } from 'angular2-signaturepad';
import { ShowDetailsComponent } from './show-details/show-details.component';
import { CouponCodeComponent } from './coupon-code/coupon-code.component';
import { CapturePopComponent } from './capture-pop/capture-pop.component';
import { ChangeClassDirective } from './change-class.directive';

@NgModule({
  declarations: [
    AppComponent,
    RegistrationComponent,
    HomeComponent,
    CameraComponent,
    ShowDetailsComponent,
    CouponCodeComponent,
    CapturePopComponent,
    ChangeClassDirective
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    HttpClientModule,
    SignaturePadModule,
    WebcamModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
