module.exports = function(api) {
  api.cache(true);
  return {
    presets: ['babel-preset-expo'],
    plugins: [
      // Handle React Native reanimated
      'react-native-reanimated/plugin',
      
      // Add support for optional chaining and nullish coalescing
      '@babel/plugin-proposal-optional-chaining',
      '@babel/plugin-proposal-nullish-coalescing-operator',
      
      // Add transform for handling directory imports issue with Firebase
      ['module-resolver', {
        extensions: ['.js', '.jsx', '.ts', '.tsx', '.android.js', '.android.tsx', '.ios.js', '.ios.tsx'],
        alias: {
          // Fix for Firebase directory imports
          '@react-native-firebase/app/lib/common': '@react-native-firebase/app/lib/common/index.js'
        }
      }]
    ]
  };
};
