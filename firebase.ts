
import { initializeApp } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-app.js";
import { getFirestore } from "https://www.gstatic.com/firebasejs/10.8.0/firebase-firestore.js";

/**
 * FIREBASE SETUP INSTRUCTIONS:
 * 1. Go to https://console.firebase.google.com/
 * 2. Create a project and add a "Web App".
 * 3. Copy the 'firebaseConfig' object and paste it below.
 * 4. Enable "Firestore Database" in the Firebase console.
 * 5. Create a collection named "payments".
 */

const firebaseConfig = {
  apiKey: "PASTE_YOUR_API_KEY_HERE",
  authDomain: "your-project.firebaseapp.com",
  projectId: "your-project-id",
  storageBucket: "your-project.appspot.com",
  messagingSenderId: "your-sender-id",
  appId: "your-app-id"
};

// Check if the user has updated the placeholders
const isConfigured = firebaseConfig.apiKey !== "PASTE_YOUR_API_KEY_HERE";

let dbInstance: any = null;

if (isConfigured) {
  try {
    const app = initializeApp(firebaseConfig);
    dbInstance = getFirestore(app);
  } catch (error) {
    console.error("Firebase Initialization Error:", error);
  }
}

export const db = dbInstance;
export const isFirebaseConfigured = isConfigured;
