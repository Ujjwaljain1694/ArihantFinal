// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, RecaptchaVerifier, signInWithPhoneNumber } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBpEcPgbQgFNIj_OccjCP75Sj4IS-hyl1w",
  authDomain: "arihant-capital-2a3f9.firebaseapp.com",
  projectId: "arihant-capital-2a3f9",
  storageBucket: "arihant-capital-2a3f9.firebasestorage.app",
  messagingSenderId: "973662651830",
  appId: "1:973662651830:web:4840e32c1dc90f5d50ad17",
  measurementId: "G-02HZCW2R8F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);

// Initialize Firebase Auth
export const auth = getAuth(app);

// Set auth settings for reCAPTCHA
auth.settings.appVerificationDisabledForTesting = false;

// Configure reCAPTCHA settings
auth.languageCode = 'en'; // Set language
auth.tenantId = null; // Clear tenant ID for multi-tenant issues

// Export Firebase functions for phone authentication
export { RecaptchaVerifier, signInWithPhoneNumber };

console.log('🔥 Firebase initialized successfully!');
console.log('📊 Analytics initialized');
console.log('🔐 Auth initialized');
console.log('🌍 Project ID:', firebaseConfig.projectId);
console.log('📱 Auth Domain:', firebaseConfig.authDomain);
console.log('🔐 reCAPTCHA Language:', auth.languageCode);
