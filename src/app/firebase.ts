import { getApp, getApps, initializeApp } from 'firebase/app';
import { getMessaging, getToken, isSupported } from 'firebase/messaging';

const firebaseConfig = {
  apiKey: 'AIzaSyBZK0MjVlnnz2WWrw68HbMEg2NgV1bTw2Y',
  authDomain: 'ptcg-locals.firebaseapp.com',
  projectId: 'ptcg-locals',
  storageBucket: 'ptcg-locals.firebasestorage.app',
  messagingSenderId: '582338884974',
  appId: '1:582338884974:web:d834fffc07099eafc9bd7f',
  measurementId: 'G-4ZC00CSGCS',
};

const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp();

const messaging = async () => {
  const supported = await isSupported();
  return supported ? getMessaging(app) : null;
};

export async function fetchToken() {
  try {
    const fcmMessaging = await messaging();
    if (fcmMessaging) {
      const token = await getToken(fcmMessaging, {
        vapidKey: process.env.NEXT_PUBLIC_FIREBASE_FCM_VAPID_KEY,
      });
      return token;
    }
    return null;
  } catch (err) {
    console.error('An error occurred while fetching the token:', err);
    return null;
  }
}

export { app, messaging };
