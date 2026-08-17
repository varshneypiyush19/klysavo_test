import { initializeApp, getApps, getApp } from 'firebase/app';
import { getAuth, initializeAuth } from 'firebase/auth';
import { Platform } from 'react-native';
import { env } from './env.config';

// AsyncStorage for persistence on mobile platforms
let AsyncStorage: any;
if (Platform.OS !== 'web') {
  try {
    AsyncStorage = require('@react-native-async-storage/async-storage').default;
  } catch (e) {
    console.warn(
      'AsyncStorage not found, auth persistence might not work on mobile',
    );
  }
}

// Map environment configuration inlined from env.config.ts
export const firebaseConfig = {
  apiKey: env.FIREBASE_API_KEY,
  authDomain: env.FIREBASE_AUTH_DOMAIN,
  projectId: env.FIREBASE_PROJECT_ID,
  storageBucket: env.FIREBASE_STORAGE_BUCKET,
  messagingSenderId: env.FIREBASE_MESSAGING_SENDER_ID,
  appId: env.FIREBASE_APP_ID,
  measurementId: env.FIREBASE_MEASUREMENT_ID,
};

// Check if it's a real config or if we should use Mock/Sandbox Mode
export const isRealConfig =
  firebaseConfig.apiKey &&
  firebaseConfig.apiKey !== '' &&
  !firebaseConfig.apiKey.startsWith('YOUR_');

export let app: any;
export let auth: any;

if (isRealConfig) {
  try {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();
    if (Platform.OS !== 'web' && AsyncStorage) {
      const { getReactNativePersistence } = require('firebase/auth');
      auth = initializeAuth(app, {
        persistence: getReactNativePersistence(AsyncStorage),
      });
    } else {
      auth = getAuth(app);
    }
    console.log('Firebase initialized successfully with real config!');
  } catch (error) {
    console.error('Firebase initialization failed:', error);
  }
} else {
  console.log(
    'Firebase is running in MOCK mode. Configure your keys in .env to connect to real Firebase.',
  );
}
