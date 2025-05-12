//
// Main Application Configuration
// https://docs.expo.dev/versions/latest/config/app/
//
// Use expo based configration, plugins, etc. as much as possible.

export default ({ config }) => ({
  ...config,
  expo: {
    name: "expo_module_core_bug_report",
    slug: "expo_module_core_bug_report",
    scheme: "expo_module_core_bug_report",
    version: "1.0.0",
    orientation: "portrait",
    icon: "./assets/icon.png",
    userInterfaceStyle: "light",
    newArchEnabled: true,
    splash: {   
      image: "./assets/splash2.png",
      resizeMode: "contain",
      backgroundColor: "#ffffff",
    },
    ios: {
      config: {
        // eslint-disable-next-line no-undef
        googleMapsApiKey: process.env.GOOGLE_IOS_API_KEY,
      },
      supportsTablet: true,
      usesAppleSignIn: true,
      bundleIdentifier: "com.expomodulecorebugreport",
      entitlements: {
        "aps-environment": "development",
      },
      // eslint-disable-next-line no-undef
      googleServicesFile: process.env.GOOGLE_SERVICES_PLIST,
      infoPlist: {
        CFBundleURLTypes: [
          {
            CFBundleURLSchemes: ["expo_module_core_bug_report"],
          },
          {
            CFBundleURLSchemes: ["com.expomodulecorebugreport"],
          },
          {
            CFBundleURLSchemes: ["com.expomodulecorebugreport.signinwithapple"],
          },
          {
            CFBundleURLSchemes: ["QFLJ7JCPWR.com.expomodulecorebugreport"],
          },
        ],
      },
      privacyManifests: {
        NSPrivacyCollectedDataTypes: [
          {
            NSPrivacyCollectedDataType: "NSPrivacyCollectedDataTypeCrashData",
            NSPrivacyCollectedDataTypeLinked: false,
            NSPrivacyCollectedDataTypeTracking: false,
            NSPrivacyCollectedDataTypePurposes: [
              "NSPrivacyCollectedDataTypePurposeAppFunctionality",
            ],
          },
          {
            NSPrivacyCollectedDataType: "NSPrivacyCollectedDataTypePerformanceData",
            NSPrivacyCollectedDataTypeLinked: false,
            NSPrivacyCollectedDataTypeTracking: false,
            NSPrivacyCollectedDataTypePurposes: [
              "NSPrivacyCollectedDataTypePurposeAppFunctionality",
            ],
          },
          {
            NSPrivacyCollectedDataType: "NSPrivacyCollectedDataTypeOtherDiagnosticData",
            NSPrivacyCollectedDataTypeLinked: false,
            NSPrivacyCollectedDataTypeTracking: false,
            NSPrivacyCollectedDataTypePurposes: [
              "NSPrivacyCollectedDataTypePurposeAppFunctionality",
            ],
          },
        ],
        NSPrivacyAccessedAPITypes: [
          {
            NSPrivacyAccessedAPIType: "NSPrivacyAccessedAPICategoryUserDefaults",
            NSPrivacyAccessedAPITypeReasons: ["CA92.1"],
          },
          {
            NSPrivacyAccessedAPIType: "NSPrivacyAccessedAPICategorySystemBootTime",
            NSPrivacyAccessedAPITypeReasons: ["35F9.1"],
          },
          {
            NSPrivacyAccessedAPIType: "NSPrivacyAccessedAPICategoryFileTimestamp",
            NSPrivacyAccessedAPITypeReasons: ["C617.1"],
          },
        ],
      },
    },
    android: {
      config: {
        googleMaps: {
          // eslint-disable-next-line no-undef
          apiKey: process.env.GOOGLE_ANDROID_API_KEY,
        },
      },
      adaptiveIcon: {
        foregroundImage: "./assets/adaptive-icon.png",
        backgroundColor: "#ffffff",
      },
      package: "com.prevac.mobile",
      // eslint-disable-next-line no-undef
      googleServicesFile: process.env.GOOGLE_SERVICES_JSON,
    },
    web: {
      favicon: "./assets/favicon.png",
    },
    plugins: [
      "expo-router",
      "expo-font",
      "./plugins/firebase-appdelegate", // firebaseAppDelegate custom plugin here for new SDK 53 AppDelegate.swift
      // "@react-native-firebase/app",
      // "@react-native-firebase/auth",     
      "@react-native-google-signin/google-signin",
      "expo-secure-store",
      // Disable expo-apple-authentication plugin if you don't
      // have local signing credentials.
      // Be careful to no commit this to git.
      // npm uninstall expo-apple-authentication
      "expo-apple-authentication",
      ["expo-build-properties", { 
        ios: { 
          useFrameworks: "static",
          deploymentTarget: "15.1",
          extraSwiftCompilerFlags: [
            "-swift-version",
            "5",
            "-Xfrontend",
            "-enable-experimental-feature",
            "-Xfrontend", 
            "NestedProtocols"
          ]
        } 
      }],
      ["expo-image-picker", { "photosPermission": "Allow $(PRODUCT_NAME) to access your photos." }],
      [
        "expo-local-authentication",
        {
          "faceIDPermission": "Allow $(PRODUCT_NAME) to use Face ID."
        }
      ],
      [
        "@sentry/react-native/expo",
        {
          "url": "https://sentry.io/",
          "project": "expo_module_core_bug_report",
          "organization": "expo",
        }
      ],
  
    ],
    extra: {
      router: {
        origin: false,
      },
    },
    owner: "rybaier",
  },
});
