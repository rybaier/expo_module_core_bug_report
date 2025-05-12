/* eslint-disable no-undef */
/* eslint-disable @typescript-eslint/no-require-imports */

const { withDangerousMod, withPlugins } = require("@expo/config-plugins");
const fs = require("fs");
const path = require("path");

function injectFirebaseIntoSwift(contents) {
  if (!contents.includes("import FirebaseCore")) {
    contents = contents.replace(/import (Expo|UIKit|React|.*)/, (match) => {
      return `${match}\nimport FirebaseCore`;
    });
  }

  if (!contents.includes("FirebaseApp.configure()")) {
    const launchRegex = /didFinishLaunchingWithOptions[\s\S]*?\{([\s\S]*?)return /;
    contents = contents.replace(launchRegex, (match, p1) => {
      return match.replace(p1, `${p1}    FirebaseApp.configure()\n`);
    });
  }

  return contents;
}

function injectFirebaseIntoObjC(contents) {
  if (!contents.includes("#import <FirebaseCore/FirebaseCore.h>")) {
    contents = contents.replace(
      /#import "AppDelegate.h"/,
      `#import "AppDelegate.h"\n#import <FirebaseCore/FirebaseCore.h>`
    );
  }

  if (!contents.includes("[FIRApp configure];")) {
    contents = contents.replace(
      /didFinishLaunchingWithOptions:(.*?)\{([\s\S]*?)return YES;/,
      (match, p1, p2) => {
        return match.replace(p2, `${p2}  [FIRApp configure];\n`);
      }
    );
  }

  return contents;
}

// Default Swift AppDelegate template if no AppDelegate exists
const defaultSwiftAppDelegate = `import UIKit
import Expo

@main
class AppDelegate: EXAppDelegateWrapper {
  override func application(_ application: UIApplication, didFinishLaunchingWithOptions launchOptions: [UIApplication.LaunchOptionsKey: Any]?) -> Bool {
    // Override point for customization after application launch.
    return super.application(application, didFinishLaunchingWithOptions: launchOptions)
  }
}
`;


const withCustomFirebaseAppDelegate = (config) => {
  return withDangerousMod(config, [
    "ios",
    async (modConfig) => {
      try {
        const iosPath = modConfig.modRequest.platformProjectRoot;
        
        // Get app name from config to determine the correct path
        const appName = modConfig.modRequest.projectName || "prevacappmobile";
        const appPath = path.join(iosPath, appName);
        
        // Check possible locations for AppDelegate
        const possibleSwiftPaths = [
          path.join(iosPath, "AppDelegate.swift"),
          path.join(appPath, "AppDelegate.swift")
        ];
        
        const possibleObjCPaths = [
          path.join(iosPath, "AppDelegate.m"),
          path.join(appPath, "AppDelegate.m")
        ];
        
        // Find first existing AppDelegate file
        let foundAppDelegatePath = null;
        let isSwift = false;
        
        for (const swiftPath of possibleSwiftPaths) {
          if (fs.existsSync(swiftPath)) {
            foundAppDelegatePath = swiftPath;
            isSwift = true;
            break;
          }
        }
        
        if (!foundAppDelegatePath) {
          for (const objcPath of possibleObjCPaths) {
            if (fs.existsSync(objcPath)) {
              foundAppDelegatePath = objcPath;
              break;
            }
          }
        }
        
        // If we found an AppDelegate file, modify it
        if (foundAppDelegatePath) {
          console.log(`🔧 Modifying ${foundAppDelegatePath} for Firebase`);
          let contents = fs.readFileSync(foundAppDelegatePath, "utf-8");
          const updated = isSwift ? injectFirebaseIntoSwift(contents) : injectFirebaseIntoObjC(contents);
          fs.writeFileSync(foundAppDelegatePath, updated);
        } else {
          // If no AppDelegate file exists, create the directory structure if needed
          if (!fs.existsSync(appPath)) {
            console.log(`📁 Creating app directory at ${appPath}`);
            fs.mkdirSync(appPath, { recursive: true });
          }
          
          // Create a new Swift AppDelegate file
          const newAppDelegatePath = path.join(appPath, "AppDelegate.swift");
          console.log(`📝 Creating new AppDelegate.swift at ${newAppDelegatePath}`);
          const swiftContents = injectFirebaseIntoSwift(defaultSwiftAppDelegate);
          fs.writeFileSync(newAppDelegatePath, swiftContents);
        }
      } catch (error) {
        console.error(`❌ Error in Firebase AppDelegate plugin: ${error.message}`);
        // Don't throw error to allow build to continue
      }
      
      return modConfig;
    },
  ]);
};

module.exports = (config) => {
  return withPlugins(config, [
    withCustomFirebaseAppDelegate
  ]);
};
