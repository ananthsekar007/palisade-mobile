# Palisade - Mobile App

<b>Palisade</b> is a cross paltform mobile app <b>(Android & iOS)</b> which mainly focuses on Task management and Key store management tool. This app allows the users to keep track of the tasks store sensitive data and infromation like passwords, public keys etc. We use <b>End to End Encryption</b> to keep the data secured. We use <b>AES (Advanced Encryption Standard) Cipher Encryption</b> which is used as electronic data encryption by make top companies all over the world. By these methods , all the data the has ever been entered is stored very securely. This app allows the users to keep track of the things and store sensitive data with a very high protection they can get.

## How to setup Mobile App

Here are the steps to follow in order to setup the mobile app in your system.

## Prerequisites

* Have React Native CLI , Node JS, Python2, Android Studio ( In case of Android ), XCode (In case of iOS), jdk8  preinstalled and setup in your system. You  can find the environmental setup documentation here [React Native Setup](https://reactnative.dev/docs/environment-setup)
* Downloading node package managers like <b>Yarn</b> is preferred.
* Have emulators installed and setup.

## Setting up Mobile App for Android 

* Clone the repository and setup in your system.
* Keep the emulator up and running.
* Go inside the project directoy and execute `yarn install` to install all the dependencies.
* Open two Terminal windows.
* In one window, run `yarn start`.
* In other window, run `yarn android` in order to build the application in debug mode.
* To build the release apk, execute command `cd android && ./gradlew assembleRelease`

## Setting up Mobile App in iOS

* Clone the repository and setup in your system.
* Keep the emulator up and running.
* Go inside the project directoy and execute `yarn install` to install all the dependencies.
* Go to `ios/` folder and open in XCode.
* Click build to run the application.

