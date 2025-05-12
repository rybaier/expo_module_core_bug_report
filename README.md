# Bug Report for expo-modules-core during upgrade to SDK 53 using xcode 15.2

## This is a blank template from create-expo-app navigation template that reproduces the error 


1. run `npx expo prebuild --clean`
2. run `npx expo run ios`
3. see the 4 error from expo-modules-core

#### Error 1   ^ value of type 'some View' has no member 'onGeometryChange'
from: /node_modules/expo-modules-core/ios/Core/Views/SwiftUI/AutoSizingStack.swift
```
  33 |             content.fixedSize(horizontal: axis.contains(.horizontal), vertical: axis.contains(.vertical))
  34 |               .hidden()
> 35 |               .onGeometryChange(for: CGSize.self, of: { proxy in proxy.size }, action: { size in
     |                ^ value of type 'some View' has no member 'onGeometryChange'
  36 |                 var size = size
  37 |                 size.width = axis.contains(.horizontal) ? size.width : ShadowNodeProxy.UNDEFINED_SIZE
  38 |                 size.height = axis.contains(.vertical) ? size.height : ShadowNodeProxy.UNDEFINED_SIZE
```
#### Error 2  ^ value of type 'some View' has no member 'onGeometryChange'
from : /node_modules/expo-modules-core/ios/Core/Views/SwiftUI/AutoSizingStack.swift:35:16)
```
  33 |             content.fixedSize(horizontal: axis.contains(.horizontal), vertical: axis.contains(.vertical))
  34 |               .hidden()
> 35 |               .onGeometryChange(for: CGSize.self, of: { proxy in proxy.size }, action: { size in
     |                ^ value of type 'some View' has no member 'onGeometryChange'
  36 |                 var size = size
  37 |                 size.width = axis.contains(.horizontal) ? size.width : ShadowNodeProxy.UNDEFINED_SIZE
  38 |                 size.height = axis.contains(.vertical) ? size.height : ShadowNodeProxy.UNDEFINED_SIZE
```

#### Error 3  ^ cannot infer return type for closure with multiple statements; add explicit type to disambiguate
from: node_modules/expo-modules-core/ios/Core/Modules/CoreModule.swift:9:40)
```
   7 | internal final class CoreModule: Module {
   8 |   internal func definition() -> ModuleDefinition {
>  9 |     Constant("expoModulesCoreVersion") {
     |                                        ^ cannot infer return type for closure with multiple statements; add explicit type to disambiguate
  10 |       let version = CoreModuleHelper.getVersion()
  11 |       let components = version.split(separator: "-")[0].split(separator: ".").compactMap { Int($0) }
  12 | 
```

#### Error 4  ^ protocol 'WithHostingView' cannot be nested inside another declaration
from: /node_modules/expo-modules-core/ios/Core/Views/SwiftUI/SwiftUIHostingView.swift:32:19)
```
  30 |    For a SwiftUI view to self-contain a HostingView, it can conform to the WithHostingView protocol.
  31 |    */
> 32 |   public protocol WithHostingView {
     |                   ^ protocol 'WithHostingView' cannot be nested inside another declaration
  33 |   }
  34 | 
  35 |   /**
```

### Environment

```
  expo-env-info 1.3.3 environment info:
    System:
      OS: macOS 13.7.5
      Shell: 5.9 - /bin/zsh
    Binaries:
      Node: 23.7.0 - /usr/local/bin/node
      Yarn: 1.22.22 - /usr/local/bin/yarn
      npm: 10.9.2 - /usr/local/bin/npm
      Watchman: 2024.12.02.00 - /usr/local/bin/watchman
    Managers:
      CocoaPods: 1.16.2 - /usr/local/bin/pod
    SDKs:
      iOS SDK:
        Platforms: DriverKit 23.2, iOS 17.2, macOS 14.2, tvOS 17.2, visionOS 1.0, watchOS 10.2
    IDEs:
      Android Studio: 2023.1 AI-231.9392.1.2311.11255304
      Xcode: 15.2/15C500b - /usr/bin/xcodebuild
    npmPackages:
      expo: ^53.0.9 => 53.0.9 
      expo-router: ~5.0.6 => 5.0.6 
      react: 19.0.0 => 19.0.0 
      react-dom: 19.0.0 => 19.0.0 
      react-native: 0.79.2 => 0.79.2 
    npmGlobalPackages:
      eas-cli: 9.0.10
    Expo Workflow: bare
```

### Notes about example during my initial upgrade to SDK 53
**Note**: I can get this to build with the plugin on my M1 macbook pro with xcode 16.3
**Note**: I can get this to build with the plugin on android

I ran into the error below from react-native-firebase plugins. so I wrote a custom plugin to properly configure firebase during prebuild
now that prebuild is working correctly I am getting the errors from expo-modules-core

```
Error: [ios.appDelegate]: withIosAppDelegateBaseMod: Don't know how to apply openUrlFix to AppDelegate of language "swift"
```


 