import { initializeApp, getApps, type FirebaseApp } from "firebase/app";
import { getAuth, type Auth } from "firebase/auth";
import { getFirestore, type Firestore } from "firebase/firestore";
import { getStorage, type FirebaseStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID,
};

let app: FirebaseApp | null = null;
let auth: Auth | null = null;
let db: Firestore | null = null;
let storage: FirebaseStorage | null = null;

function getApp() {
  if (!firebaseConfig.apiKey) return null;
  if (!app) {
    app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
  }
  return app;
}

export function getFirebaseAuth() {
  const a = getApp();
  if (!a) return null;
  if (!auth) auth = getAuth(a);
  return auth;
}

export function getFirebaseDb() {
  const a = getApp();
  if (!a) return null;
  if (!db) db = getFirestore(a);
  return db;
}

export function getFirebaseStorage() {
  const a = getApp();
  if (!a) return null;
  if (!storage) storage = getStorage(a);
  return storage;
}

export default getApp;
