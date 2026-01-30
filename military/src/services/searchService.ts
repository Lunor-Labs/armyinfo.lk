import { db } from '../firebase/config';
import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

export interface SearchResult {
    id: string;
    [key: string]: any;
}

export const searchOfficers = async (searchQuery: string): Promise<SearchResult[]> => {
    if (!searchQuery) return [];
    const q = query(collection(db, "officers"), where("serviceNumber", "==", searchQuery));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const searchVehicles = async (searchQuery: string): Promise<SearchResult[]> => {
    if (!searchQuery) return [];
    const q = query(collection(db, "vehicles"), where("plateNumber", "==", searchQuery));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const searchPublic = async (searchQuery: string): Promise<SearchResult[]> => {
    if (!searchQuery) return [];
    const q = query(collection(db, "public"), where("nic", "==", searchQuery));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Admin: Get all data
export const getAllOfficers = async (): Promise<SearchResult[]> => {
    const querySnapshot = await getDocs(collection(db, "officers"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getAllVehicles = async (): Promise<SearchResult[]> => {
    const querySnapshot = await getDocs(collection(db, "vehicles"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

export const getAllPublic = async (): Promise<SearchResult[]> => {
    const querySnapshot = await getDocs(collection(db, "public"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Admin: CRUD operations
export const addRecord = async (collectionName: string, data: any) => {
    return await addDoc(collection(db, collectionName), data);
};

export const updateRecord = async (collectionName: string, id: string, data: any) => {
    const docRef = doc(db, collectionName, id);
    return await updateDoc(docRef, data);
};

export const deleteRecord = async (collectionName: string, id: string) => {
    const docRef = doc(db, collectionName, id);
    return await deleteDoc(docRef);
};
