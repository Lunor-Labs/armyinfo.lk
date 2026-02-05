import { db } from '../firebase/config';
import { collection, query, where, getDocs, addDoc, updateDoc, deleteDoc, doc } from 'firebase/firestore';

export interface SearchResult {
    id: string;
    [key: string]: any;
}

export const searchOfficers = async (searchQuery: string): Promise<SearchResult[]> => {
    if (!searchQuery) return [];
    const cleanQuery = searchQuery.trim();
    console.log(`[SearchService] Searching Officers for: "${cleanQuery}"`);

    try {
        // Search in 'officers' collection
        const qOfficers = query(collection(db, "officers"), where("serviceNumber", "==", cleanQuery));
        const officersSnapshot = await getDocs(qOfficers);
        const officersResults = officersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log(`[SearchService] Officers collection found: ${officersResults.length} docs`);

        // Also search in 'users' collection (registered soldiers)
        const qUsers = query(collection(db, "users"), where("serviceNumber", "==", cleanQuery));
        const usersSnapshot = await getDocs(qUsers);
        const usersResults = usersSnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log(`[SearchService] Users collection found: ${usersResults.length} docs`);

        return [...officersResults, ...usersResults];
    } catch (error) {
        console.error(`[SearchService] searchOfficers failed:`, error);
        throw error;
    }
};

export const searchVehicles = async (searchQuery: string): Promise<SearchResult[]> => {
    if (!searchQuery) return [];
    const cleanQuery = searchQuery.trim();
    console.log(`[SearchService] Searching Vehicles for: "${cleanQuery}"`);

    try {
        const q = query(collection(db, "vehicles"), where("plateNumber", "==", cleanQuery));
        const querySnapshot = await getDocs(q);
        const results = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log(`[SearchService] Vehicles found: ${results.length} docs`);
        return results;
    } catch (error) {
        console.error(`[SearchService] searchVehicles failed:`, error);
        throw error;
    }
};

export const searchPublic = async (searchQuery: string): Promise<SearchResult[]> => {
    if (!searchQuery) return [];
    const cleanQuery = searchQuery.trim();
    console.log(`[SearchService] Searching Public for: "${cleanQuery}"`);

    try {
        const q = query(collection(db, "public"), where("nic", "==", cleanQuery));
        const querySnapshot = await getDocs(q);
        const results = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        console.log(`[SearchService] Public records found: ${results.length} docs`);
        return results;
    } catch (error) {
        console.error(`[SearchService] searchPublic failed:`, error);
        throw error;
    }
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

export const getAllUsers = async (): Promise<SearchResult[]> => {
    const querySnapshot = await getDocs(collection(db, "users"));
    return querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
};

// Admin: CRUD operations
export const addRecord = async (collectionName: string, data: Partial<SearchResult>) => {
    return await addDoc(collection(db, collectionName), data);
};

export const updateRecord = async (collectionName: string, id: string, data: Partial<SearchResult>) => {
    const docRef = doc(db, collectionName, id);
    return await updateDoc(docRef, data);
};

export const deleteRecord = async (collectionName: string, id: string) => {
    const docRef = doc(db, collectionName, id);
    return await deleteDoc(docRef);
};
