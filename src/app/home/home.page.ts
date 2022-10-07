import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { Blocker, HyperTrack, HyperTrackPlugin } from '@awesome-cordova-plugins/hyper-track/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { Observable,Observer,Subscription } from 'rxjs';
import { take } from 'rxjs/operators';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy  {
  hypertrackInstance:HyperTrack;
  isRegistered:boolean = false;
  sdkInstance:HyperTrack;
  trackingSubscription:Subscription;
  availabilitySubscription: Subscription;
  deviceId: string = 'NA';
  trackingStatus: boolean = false;
  trackingStateChange: any;
  availabilityStatus: any;
  constructor(private alertController: AlertController,public platform: Platform,private changeRef: ChangeDetectorRef) {
    HyperTrack.enableDebugLogging();
    this.initialize();
  }

  async initialize() {
    try {
      if (this.platform.is('android')) {
        this.getBlocker();
      }
      const result = await HyperTrack.initialize('YOUR-PUBLISHABLE-KEY-HERE');
      this.hypertrackInstance = result;
      await this.getDeviceId();
      this.addTrackingListener();
      this.addAvailabilityListener();
      await this.hypertrackInstance.setDeviceName('Quickstart Ionic');
      this.trackingStatus = await this.isTrackingStatus()
      this.changeRef.detectChanges();
    } catch (error) {
      
    }
  }
  
  async startHyperTrack() {
    try {
      if (this.platform.is('android')) {
        this.getBlocker();
      }
      await this.hypertrackInstance.start();
    } catch (error) {
      console.log(error);
    }
  }

  async stopHyperTrack() {
    try {
      this.trackingStatus = await this.isTrackingStatus();
      if (this.trackingStatus) {
        await this.hypertrackInstance.stop();
      }
    } catch (error) {
      console.log(error);
    }
  }

  getBlocker() {
      HyperTrack.getBlockers().then( blockers =>
      {      
        blockers.forEach( blocker => {
          blocker.resolve();
        });
      }
    )
    .catch( err => console.error("Got error, while retrieving blockers " + err));
  }
  
  async getDeviceId() {
    try {
      this.deviceId = await this.hypertrackInstance.getDeviceId();
    } catch (error) {
      console.log(error);
    }
  }
  
  addTrackingListener() {
    this.trackingSubscription = this.hypertrackInstance.trackingStateChange().subscribe((res:any) => {
      console.log('TrackingListener added');
      this.trackingStateChange = res;
      if (res === 'start') {
        this.trackingStatus = true;
      } else {
        this.trackingStatus = false;
      }
      this.changeRef.detectChanges();
      return;
    },(err)=>{
      console.log(err);
    });
  }

  addAvailabilityListener() {
    this.availabilitySubscription = this.hypertrackInstance.availabilityStateChange().subscribe((info:any) => {
      console.log('AvailabilityListener added');
      this.availabilityStatus = info;
        this.changeRef.detectChanges();
      return;
    },(err)=>{
      console.log(err);
    });
  }

  async getAvailabilityStatus() {
    try {
      const res = await this.hypertrackInstance.getAvailability();
      this.showAlert('Message', res);
    } catch (error) {
      console.log(error);
      this.showAlert('Error', error);
    }
  }
  
  async isRunning() {
    try {
      const result = await this.hypertrackInstance.isRunning();
      this.showAlert('isRunning called', JSON.stringify(result));
    } catch (error) {
      console.log(error);
      this.showAlert('Error', error);
    }
  }

  async isTrackingStatus() {
    try {
      const res = await this.hypertrackInstance.isTracking();
      return res;
    } catch (error) {
      console.log(error);
    }
  }

  async isTrackingMethod() {
    try {
      const result = await this.hypertrackInstance.isTracking();
      this.showAlert('isTracking called', JSON.stringify(result));
    } catch (error) {
      console.log(error);
      this.showAlert('Error', error);
    }
  }

  async setMetadata() {
    try {
      await this.hypertrackInstance.setDeviceMetadata({ appName: "cordova-quickstart", appVersion: "1.0.0" });
      this.showAlert('Data set successfully', JSON.stringify({ appName: "cordova-quickstart", appVersion: "1.0.0" }));
    } catch (error) {
      console.log(error);
      this.showAlert('Error', error);
    }
  }

  async syncDevice() {
    try {
      await this.hypertrackInstance.syncDeviceSettings();
      this.showAlert('Message', 'syncDevice called');
    } catch (error) {
      console.log(error);
      this.showAlert('Error', error);
    }
  }

  async setTrackingNotificationProperties() {
    try {
      await this.hypertrackInstance.setTrackingNotificationProperties('Tracking On','Ionic SDK is tracking');
      this.showAlert('','Notification properties changed');
    } catch (error) {
      console.log(error);
      this.showAlert('Error', error);
    }
  }

  async requestPermissions() {
    try {
      await this.hypertrackInstance.requestPermissionsIfNecessary();
      this.showAlert('Message', 'requestPermissionsIfNecessary called');
    } catch (error) {
      console.log(error);
      this.showAlert('Error', error);
    }
  }
  
  async addGeoTag() {
    try {
      await this.hypertrackInstance.addGeotag({ "orderId": "ABC00001" },{latitude: 26.922070, longitude: 75.778885});
      this.showAlert('Message','geo tag added');
    } catch (error) {
      console.log(error);
      this.showAlert('Error', error);
    }
  }

  async mockLocations() {
    try {
      await this.hypertrackInstance.allowMockLocations();
      this.showAlert('Message', 'Mock Locations allowed');
    } catch (error) {
      console.log(error);
      this.showAlert('Error', error);
    }
  }

  async setAvailability(value:boolean) {
    try {
      await this.hypertrackInstance.setAvailability(value);
    } catch (error) {
      console.log(error);
    }
  }

  async showAlert(header: string, message: string) {
    const alert = await this.alertController.create({
      header: header,
      message: message,
      buttons: ['OK'],
    });
    await alert.present();
  }

  ngOnDestroy(): void {
    this.hypertrackInstance.disposeTrackingState().then(() => {
      this.trackingSubscription.unsubscribe();
    });
    this.hypertrackInstance.disposeAvailabilityState().then(() => {
      this.availabilitySubscription.unsubscribe();
    });
  }
}
