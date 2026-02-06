import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";

if (!getApps().length) {
  const serviceAccount = process.env.FIREBASE_ADMIN_SDK
    ? JSON.parse(process.env.FIREBASE_ADMIN_SDK)
    : undefined;

  initializeApp({
    credential: serviceAccount ? cert(serviceAccount) : undefined,
  });
}

export const adminDb = getFirestore();
export const adminAuth = getAuth();
export const adminStorage = getStorage();
