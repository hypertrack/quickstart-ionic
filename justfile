copy-local-plugin:
    rm -rf node_modules/@awesome-cordova-plugins/hyper-track
    cp -r ../ionic-native/dist/@awesome-cordova-plugins/plugins/hyper-track node_modules/@awesome-cordova-plugins/

open-nm-plugins:
    open node_modules/@awesome-cordova-plugins