import { Component, OnInit,ElementRef,Renderer2, ViewChild, EventEmitter, Output } from '@angular/core';
import { MyserviceService } from '../service/myservice.service';
import { Router } from '@angular/router';
// import {Subject} from 'rxjs/Subject';
// import {Observable} from 'rxjs/Observable';
import { Subject, Observable, of } from 'rxjs';
import {WebcamImage, WebcamInitError, WebcamUtil} from 'ngx-webcam';
import { delay } from 'rxjs/operators';
declare var $: any;


@Component({
  selector: 'app-camera',
  templateUrl: './camera.component.html',
  styleUrls: ['./camera.component.scss']
})
export class CameraComponent implements OnInit {

  

  constructor(private renderer: Renderer2,
    public router:Router,
    private myService:MyserviceService) { }

// OLD camera

//   ngOnInit(): void {
//     this.startCamera();
//   }
//   @ViewChild('video', { static: true }) videoElement: ElementRef;
//   @ViewChild('canvas', { static: true }) canvas: ElementRef;
//   videoWidth = 0;
//   videoHeight = 0;

//   constraints = {
//     video: {
//         facingMode: "environment",
//         width: { ideal: 4096 },
//         height: { ideal: 2160 }
//     }
// };
// startCamera() {
//   if (!!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia)) { 
// navigator.mediaDevices.getUserMedia(this.constraints).then(this.attachVideo.bind(this)).catch(this.handleError);
//   } else {
//       alert('Sorry, camera not available.');
//   }
// }
// handleError(error) {
// console.log('Error: ', error);
// }
// attachVideo(stream) {
// this.renderer.setProperty(this.videoElement.nativeElement, 'srcObject', stream);
// this.renderer.listen(this.videoElement.nativeElement, 'play', (event) => {
//   this.videoHeight = this.videoElement.nativeElement.videoHeight;
//   this.videoWidth = this.videoElement.nativeElement.videoWidth;
// });
// }
// capture() {
// this.renderer.setProperty(this.canvas.nativeElement, 'width', this.videoWidth);
// this.renderer.setProperty(this.canvas.nativeElement, 'height', this.videoHeight);
// this.canvas.nativeElement.getContext('2d').drawImage(this.videoElement.nativeElement, 0, 0);
// }





@Output()
public pictureTaken = new EventEmitter<WebcamImage>();
// toggle webcam on/off
public showWebcam = true;
public allowCameraSwitch = true;
public multipleWebcamsAvailable = false;
public deviceId: string;
public videoOptions: MediaTrackConstraints = {
// width: {ideal: 1024},
// height: {ideal: 576}
};
public errors: WebcamInitError[] = [];
// webcam snapshot trigger
private trigger: Subject<void> = new Subject<void>();
// switch to next / previous / specific webcam; true/false: forward/backwards, string: deviceId
private nextWebcam: Subject<boolean|string> = new Subject<boolean|string>();
private _imageAsDataUrl:string;
private _userId:string;
public ngOnInit(): void {
WebcamUtil.getAvailableVideoInputs()
.then((mediaDevices: MediaDeviceInfo[]) => {
this.multipleWebcamsAvailable = mediaDevices && mediaDevices.length > 1;
});

  this._getUserId();

$(document).ready(function(){

});

}

private _getUserId(){
  this.myService.userId.subscribe(
    userId=>{
      if(userId){
        this._userId = userId;
      }
    }
  )
}

public triggerSnapshot(): void {
  of(null).pipe(
    delay(200)
  ).subscribe(()=>{
    this.myService.photo({_id:this._userId,im:this._imageAsDataUrl})
    .subscribe(res=>{
      console.log(res);
    })
  })
  
this.trigger.next();
this.router.navigateByUrl('capturePop');
}
public toggleWebcam(): void {
this.showWebcam = !this.showWebcam;
}
public handleInitError(error: WebcamInitError): void {
this.errors.push(error);
}
// public showNextWebcam(directionOrDeviceId: boolean|string): void {
// // true => move forward through devices
// // false => move backwards through devices
// // string => move to device with given deviceId
// this.nextWebcam.next(directionOrDeviceId);
// }
public handleImage(webcamImage: WebcamImage): void {
console.info('received webcam image', webcamImage);
this._imageAsDataUrl = webcamImage['_imageAsDataUrl'];
console.log('Data URl',this._imageAsDataUrl);
this.pictureTaken.emit(webcamImage);
}
public cameraWasSwitched(deviceId: string): void {
console.log('active device: ' + deviceId);
this.deviceId = deviceId;
}
public get triggerObservable(): Observable<void> {
return this.trigger.asObservable();
}
public get nextWebcamObservable(): Observable<boolean|string> {
return this.nextWebcam.asObservable();
}


}
