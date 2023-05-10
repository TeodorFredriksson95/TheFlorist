import { app} from '../firebase';
import { getFirestore, collection, doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';

export const GetFavoriteFlowers = async (): Promise<any[]> => {
  try {
    const dbInstance = getFirestore(app);
    const flowerFavoritesRef = collection(dbInstance, 'favorites');
    const userFavoritesDocRef = doc(flowerFavoritesRef, 'flowerFavorites');
    const userFavoritesSnapshot = await getDoc(userFavoritesDocRef);
    if (!userFavoritesSnapshot.exists) {
      return [];
    }
    const userFavoritesData = userFavoritesSnapshot.data();

    if (userFavoritesData) {
      return Object.values(userFavoritesData);
    }
  } catch (error) {
    console.error(error);
  }
  return [];
};

