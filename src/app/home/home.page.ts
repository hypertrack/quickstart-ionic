import { ChangeDetectorRef, Component, OnDestroy } from '@angular/core';
import { HyperTrack } from '@awesome-cordova-plugins/hyper-track/ngx';
import { AlertController, Platform } from '@ionic/angular';
import { Observable, Observer, Subscription } from 'rxjs';
import { take } from 'rxjs/operators';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage implements OnDestroy {
  hyperTrack: HyperTrack;
  trackingSubscription: Subscription;
  availabilitySubscription: Subscription;
  errorsSubscription: Subscription;
  deviceId: string = 'NA';

  constructor(
    private alertController: AlertController, 
    public platform: Platform, 
    private changeRef: ChangeDetectorRef
  ) {
    platform.ready().then((readySource) => {
      console.log("Platform ready")
      this.initialize();
    })
  }

  async initialize() {
    try {
      console.log("initialize")
      const result = await HyperTrack.initialize('YOUR-PUBLISHABLE-KEY-HERE');
      this.hyperTrack = result;
      console.log("result "+ result)
      this.deviceId = await this.hyperTrack.getDeviceId();
      console.log(`Device Id: ${this.deviceId}`)
      this.addTrackingListener();
      this.addAvailabilityListener();
      // errors
      await this.hyperTrack.setDeviceName('Quickstart Ionic');
      this.changeRef.detectChanges();
    } catch (error) {
      console.log(error)
    }
  }

  async startHyperTrack() {
    try {
      await this.hyperTrack.start();
    } catch (error) {
      console.log(error);
    }
  }

  async stopHyperTrack() {
    try {
      await this.hyperTrack.stop();
    } catch (error) {
      console.log(error);
    }
  }

  addTrackingListener() {
    // this.trackingSubscription = this.hyperTrack.trackingStateChange().subscribe((res:any) => {
    //   console.log('TrackingListener added');
    //   this.trackingStateChange = res;
    //   if (res === 'start') {
    //     this.trackingStatus = true;
    //   } else {
    //     this.trackingStatus = false;
    //   }
    //   this.changeRef.detectChanges();
    //   return;
    // },(err)=>{
    //   console.log(err);
    // });
  }

  addAvailabilityListener() {
    // this.availabilitySubscription = this.hyperTrack.availabilityStateChange().subscribe((info:any) => {
    //   console.log('AvailabilityListener added');
    //   this.availabilityStatus = info;
    //     this.changeRef.detectChanges();
    //   return;
    // },(err)=>{
    //   console.log(err);
    // });
  }

  async getAvailabilityStatus() {
    // try {
    //   const res = await this.hyperTrack.getAvailability();
    //   this.showAlert('Message', res);
    // } catch (error) {
    //   console.log(error);
    //   this.showAlert('Error', error);
    // }
  }

  async isTrackingStatus() {
    // try {
    //   const res = await this.hyperTrack.isTracking();
    //   return res;
    // } catch (error) {
    //   console.log(error);
    // }
  }

  async isTrackingMethod() {
    // try {
    //   const result = await this.hyperTrack.isTracking();
    //   this.showAlert('isTracking called', JSON.stringify(result));
    // } catch (error) {
    //   console.log(error);
    //   this.showAlert('Error', error);
    // }
  }

  async setMetadata() {
    try {
      await this.hyperTrack.setDeviceMetadata({ appName: "cordova-quickstart", appVersion: "1.0.0" });
      this.showAlert('Data set successfully', JSON.stringify({ appName: "cordova-quickstart", appVersion: "1.0.0" }));
    } catch (error) {
      console.log(error);
      this.showAlert('Error', error);
    }
  }

  async syncDevice() {
    try {
      await this.hyperTrack.syncDeviceSettings();
      this.showAlert('Message', 'syncDevice called');
    } catch (error) {
      console.log(error);
      this.showAlert('Error', error);
    }
  }

  async setTrackingNotificationProperties() {
    try {
      await this.hyperTrack.setTrackingNotificationProperties('Tracking On', 'Ionic SDK is tracking');
      this.showAlert('', 'Notification properties changed');
    } catch (error) {
      console.log(error);
      this.showAlert('Error', error);
    }
  }

  async requestPermissions() {
    try {
      await this.hyperTrack.requestPermissionsIfNecessary();
      this.showAlert('Message', 'requestPermissionsIfNecessary called');
    } catch (error) {
      console.log(error);
      this.showAlert('Error', error);
    }
  }

  async addGeoTag() {
    try {
      await this.hyperTrack.addGeotag({ "orderId": "ABC00001" }, { latitude: 26.922070, longitude: 75.778885 });
      this.showAlert('Message', 'geo tag added');
    } catch (error) {
      console.log(error);
      this.showAlert('Error', error);
    }
  }

  async mockLocations() {
    try {
      await this.hyperTrack.allowMockLocations();
      this.showAlert('Message', 'Mock Locations allowed');
    } catch (error) {
      console.log(error);
      this.showAlert('Error', error);
    }
  }

  async setAvailability(value: boolean) {
    // try {
    //   await this.hyperTrack.setAvailability(value);
    // } catch (error) {
    //   console.log(error);
    // }
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
    // this.hyperTrack.disposeTrackingState().then(() => {
    //   this.trackingSubscription.unsubscribe();
    // });
    // this.hyperTrack.disposeAvailabilityState().then(() => {
    //   this.availabilitySubscription.unsubscribe();
    // });
  }
}
