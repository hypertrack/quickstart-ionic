import { Component } from '@angular/core';
import { HyperTrack } from '@awesome-cordova-plugins/hyper-track/ngx';
@Component({
  selector: 'app-home',
  templateUrl: 'home.page.html',
  styleUrls: ['home.page.scss'],
})
export class HomePage {
  isRegistered:boolean = false;
  sdkInstance:HyperTrack;
  constructor() {
    
  }

  async buttonClicked() {
    try {
      console.log("Button Clicked")
      console.log("Initializing HyperTrack")
      HyperTrack.enableDebugLogging();
      this.sdkInstance = await HyperTrack.initialize('jNvgqDgY_j3yj-OwbTQtVcCoVGMOLkmllgV7KUtElL5j3g3nGwNEpLzdOO88KZ1E6rkeGmH7b9spUSFIYM5SkQ');
      console.log("HyperTrack succesfully initialized");
      this.isRegistered = true;
      await this.sdkInstance.setDeviceName('QuickStart');
      await this.sdkInstance.setDeviceMetadata({title:'QuickStart App',message:'This is quickstart testing app'});
    } catch (error) {
      console.log("error found",error);
    }
  }

  startHyperTrack() {
    this.sdkInstance.start().then(res => console.log('started'));
  }
  
  stopHyperTrack() {
    this.sdkInstance.stop().then(res => { 
      console.log('stop tracking');
      this.isRegistered = false;
    });
  }

  

}
