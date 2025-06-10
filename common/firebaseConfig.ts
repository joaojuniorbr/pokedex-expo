import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
	apiKey: process.env.EXPO_PUBLIC_FB_API_KEY,
	authDomain: process.env.EXPO_PUBLIC_FB_AUTH_DOMAIN,
	projectId: process.env.EXPO_PUBLIC_FB_PROJECT_ID,
	storageBucket: process.env.EXPO_PUBLIC_FB_STORAGE_BUCKET,
	messagingSenderId: process.env.EXPO_PUBLIC_FB_MESSAGING_SENDER_ID,
	appId: process.env.EXPO_PUBLIC_FB_APP_ID,
};

console.log({ firebaseConfig });

const app = initializeApp(firebaseConfig);
const authFirebase = getAuth(app);

export { authFirebase };
