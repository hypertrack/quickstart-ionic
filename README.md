# quickstart-ionic
HyperTrack integration sample for Ionic Cordova

[Docs](https://hypertrack.com/docs/install-sdk-ionic)

## Create HyperTrack Account

[Sign up](https://dashboard.hypertrack.com/signup) for HyperTrack and
get your publishable key from the [Setup page](https://dashboard.hypertrack.com/setup).

## Set up Firebase

1. [Set up Firebase Project for quickstart-ionic](https://console.firebase.google.com/u/0/)

## Set up [ionic native wrapper](https://github.com/hypertrack/ionic-native)

Follow the following step to add ionic native wrapper in your project.
1. clone the repo(https://github.com/hypertrack/ionic-native)
2. checkout to ```feature/add-missing-interfaces``` 
3. add dependencies ```npm i```
4. npm run build
5. Go to the path ```ionic-native/dist/@awesome-cordova-plugins/plugins```
6. Copy ```hyper-track```
7. Go to the quickstart app ```cd quickstart-ionic```
8. Paste copied folder in ```./quickstart-ionic/node_modules/@awesome-cordova-plugins``` (please replace the folder if already exists).  

## Build the app

Install dependepcies
```npm i```

Prepare Ionic build by running [build command](https://ionicframework.com/docs/cli/commands/capacitor-build):
```ionic capacitor build```

This command will generate platform files in `ios` and `android` folders

You need to add more changes to `android` folder in order for app to work 

#### Update Android SDK versions

In ```quickstart-ionic/android/variables.gradle```:

```
minSdkVersion = 24
compileSdkVersion = 31
targetSdkVersion = 31
```
In ```quickstart-ionic/ios/App/App/Info.plist```

```
<key>NSDebugDescription</key>
<string>&lt;YOUR APP&gt; needs to access this device's motion updates for &lt;REASON&gt;</string>
<key>NSLocationAlwaysAndWhenInUseUsageDescription</key>
<string>&lt;YOUR APP&gt; needs to access this device's location for &lt;REASON&gt;</string>
<key>NSLocationWhenInUseUsageDescription</key>
<string>&lt;YOUR APP&gt; needs to access this device's location for &lt;REASON&gt;</string>
<key>NSMotionUsageDescription</key>
<string>&lt;YOUR APP&gt; needs to access this device's motion updates for &lt;REASON&gt;</string>
<key>UIBackgroundModes</key>
<array>
    <string>location</string>
    <string>remote-notification</string>
</array>
```

#### Build

Build the app for each platform using corresponding native IDE (Android Studio / Xcode)

This command will open the IDE. If it didn't happen you need to do it manually. 



## Support
Join our [Slack community](https://join.slack.com/t/hypertracksupport/shared_invite/enQtNDA0MDYxMzY1MDMxLTdmNDQ1ZDA1MTQxOTU2NTgwZTNiMzUyZDk0OThlMmJkNmE0ZGI2NGY2ZGRhYjY0Yzc0NTJlZWY2ZmE5ZTA2NjI) for instant responses. You can also email us at help@hypertrack.com.
