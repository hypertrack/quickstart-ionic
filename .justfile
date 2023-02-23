copy-local-plugin:
    rm -rf node_modules/@awesome-cordova-plugins/hyper-track
    cp -r ../ionic-native/dist/@awesome-cordova-plugins/plugins/hyper-track node_modules/@awesome-cordova-plugins/

open-nm-plugins:
    open node_modules/@awesome-cordova-plugins

build-android:
    ionic cordova build android

run-android:
    ionic cordova run android

run-ios:
    ionic cordova run ios

update-plugin-local:
    ionic cordova plugin remove cordova-plugin-hypertrack-v3
    ionic cordova plugin add cordova-plugin-hypertrack-v3

# you will need to copy google-services.json manually
re-add-android:
    ionic cordova platform remove android
    ionic cordova platform add android

alias u := update-plugin-local
alias a := run-android
alias c := copy-local-plugin
alias ba := build-android