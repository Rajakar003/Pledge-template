import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { RegistrationComponent } from './registration/registration.component';
import { CameraComponent } from './camera/camera.component';
import { ShowDetailsComponent } from './show-details/show-details.component';
import { CouponCodeComponent } from './coupon-code/coupon-code.component';
import { CapturePopComponent } from './capture-pop/capture-pop.component';


const routes: Routes = [
  { path: '', component: RegistrationComponent },
  { path: 'home', component: HomeComponent },
  { path: 'form', component: RegistrationComponent },
  { path: 'camera', component: CameraComponent },
  { path: 'showDetails', component: ShowDetailsComponent },
  { path: 'couponCode', component: CouponCodeComponent },
  {path: 'capturePop', component: CapturePopComponent},
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
