alias ba := build-android
alias ra := run-android

alias ap := add-plugin
alias rp := remove-plugin
alias up := update-plugin
alias c := copy-local-ionic-native-plugin
alias o := open-app-code
alias on := open-nm-ionic-native-code

alias rap := remove-android
alias aap := add-android

open-app-code:
    code src/app/home/home.page.ts

open-nm-ionic-native-code:
    code node_modules/@awesome-cordova-plugins/hyper-track

add-plugin version = "latest":
    ionic cordova plugin add cordova-plugin-hypertrack-v3@{{version}}

remove-plugin:
    ionic cordova plugin rm cordova-plugin-hypertrack-v3

update-plugin version = "latest":
    ionic cordova plugin rm cordova-plugin-hypertrack-v3
    rm -rf node_modules/cordova-plugin-hypertrack-v3
    rm package-lock.json
    npm i
    ionic cordova plugin add cordova-plugin-hypertrack-v3@{{version}}

copy-local-ionic-native-plugin:
    rm -rf node_modules/@awesome-cordova-plugins/hyper-track
    cp -r ../ionic-native/dist/@awesome-cordova-plugins/plugins/hyper-track node_modules/@awesome-cordova-plugins/

create-symlink-to-local-plugin:
    rm -rf node_modules/@awesome-cordova-plugins/hyper-track
    ln -s "../ionic-native/dist/@awesome-cordova-plugins/plugins/hyper-track" node_modules/@awesome-cordova-plugins/hyper-track

delete-nm-plugin:
    rm -rf node_modules/@awesome-cordova-plugins/hyper-track

build-android:
    ionic cordova build android

run-android:
    ionic cordova run android

remove-android:
    ionic cordova platform rm android

add-android:
    ionic cordova platform add android

# test how plugin works with clean project
test-cordova-init:
    just remove-android
    just add-android
    ionic cordova plugin rm cordova-plugin-hypertrack-v3
    ionic cordova plugin add cordova-plugin-hypertrack-v3
    just a

# used to make sure the latest code is shipped for ionic native plugin
reset-plugin:
    rm -rf node_modules/@awesome-cordova-plugins/hyper-track
    npm i
    just a
    just c
    just a
