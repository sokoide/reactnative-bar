# React Native / Objective-C interop

## About

* Quick examples to call Objective-C function from React javascript or React javascript function from Objective-C

## Notes on M1 macs

* To build / run on M1 Mac, the following changes are made. Please refer to _Podfile_ for more details
	* `ONLY_ACTIVE_ARCH` set to *No*
	* _arm64_ and _i386_ are added in `EXCLUDED_ARCHS[sdk=iphonesimulator*]`
	* _amrv7_ is added in `EXCLUDED_ARCHS
* In addition, you need to follow the following steps to set up the env

```
# dont use rbenv's ruby 2.7.0, but use ruby 2.6 comes with Big Sur
# remove cocoapods and ffi if installed
sudo arch -x86_64 gem install cocoapods
sudo arch -x86_64 gem install ffi
cd ios
arch -x86_64 pod install # or arch -x86_64 pod update
```
## How to build

```shj
yarn
cd ios
# if Intel Mac
pod update
# if M1 Mac
arch -x86_64 pod update
# build bar.xcworkspace in Xcode
```
