import { initializeApp, getApps, cert } from "firebase-admin/app";
import { getFirestore } from "firebase-admin/firestore";
import { getAuth } from "firebase-admin/auth";
import { getStorage } from "firebase-admin/storage";

function initAdmin() {
  if (getApps().length > 0) return;

  const serviceAccount = process.env.FIREBASE_ADMIN_SDK
    ? JSON.parse(process.env.FIREBASE_ADMIN_SDK)
    : undefined;

  if (serviceAccount) {
    initializeApp({ credential: cert(serviceAccount) });
  } else {
    // Skip initialization when Firebase Admin SDK is not configured
    return;
  }
}

export function getAdminDb() {
  initAdmin();
  if (getApps().length === 0) return null;
  return getFirestore();
}

export function getAdminAuth() {
  initAdmin();
  if (getApps().length === 0) return null;
  return getAuth();
}

export function getAdminStorage() {
  initAdmin();
  if (getApps().length === 0) return null;
  return getStorage();
}
