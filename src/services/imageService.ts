import { storage } from '../firebase/config';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';

export const uploadSoldierImage = async (file: File, serviceNumber: string): Promise<string> => {
  const imageRef = ref(storage, `soldiers/${serviceNumber}_${Date.now()}`);
  await uploadBytes(imageRef, file);
  return await getDownloadURL(imageRef);
};
