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

[Docs](https://hypertrack.com/docs/install-sdk-ionic)

Follow the following step to add ionic native wrapper in your project.
1. clone the repo(https://github.com/hypertrack/ionic-native)
2. checkout to ```feature/add-missing-interfaces``` 
3. add dependencies ```npm i```
4. npm run build
5. Go to the path ```ionic-native/dist/@awesome-cordova-plugins/plugins```
6. Copy ```hyper-track```
7. Go to the quickstart app ```cd quickstart-ionic```
8. Paste copied folder in ```./quickstart-ionic/node_modules/@awesome-cordova-plugins``` (please replace the folder if already exists).  

#### Update Android SDK versions

In ```quickstart-ionic/android/variables.gradle```:

```
minSdkVersion = 24
compileSdkVersion = 31
targetSdkVersion = 31
```

cordova-plugin-hypertrack-v3