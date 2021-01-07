import { Component } from '@angular/core';
import {HyperTrack} from '@ionic-native/hyper-track';

@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {

  constructor() {}

  buttonClicked() {
    console.log("Button Clicked")
    console.log("Initializing HyperTrack")
    HyperTrack.enableDebugLogging()
    HyperTrack.initialize('YOUR-PUBLISHABLE-KEY-HERE')
    .then( this.onSdkInstanceReceived )
    .catch((err) => console.error("HyperTrack init failed with error " + err));  
    
  }

   onSdkInstanceReceived(sdkInstance: HyperTrack) {
    console.log("HyperTrack succesfully initialized");
  }

}
