import { initializeApp } from "firebase/app";
import { getStorage } from "firebase/storage"
import { getFirestore } from "@firebase/firestore"
import {env} from "./env.config";


const firebaseConfig = {
    apiKey: env.VITE_FIRE_API_KEY,
    authDomain: env.VITE_FIRE_AUTH_DOMAIN,
    projectId: env.VITE_FIRE_PROJECT_ID,
    storageBucket: env.VITE_FIRE_STORAGE_BUCKET,
    messagingSenderId: env.VITE_FIRE_MESSAGING_SENDER_ID,
    appId: env.VITE_FIRE_APP_ID,
    measurementId: env.VITE_FIRE_MEASUREMENT_ID
};

// Initialize Firebase
export const firebaseApp = initializeApp(firebaseConfig);
export const fireStorage = getStorage(firebaseApp)
export const fireDB = getFirestore(firebaseApp)

export type FireDbPaths = 'todo'

export type FireDateType = {
    nanoseconds: number
    seconds: number
}
