import { FetchFlowers } from "../types/Flowers";
import { db, app } from '../firebase';
import { getFirestore, collection, doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';

  export const handleAddToFavorites = async (selectedFlower: FetchFlowers) => {
  if (!selectedFlower) return;

  const dbInstance = getFirestore(app);
  const favoritesRef = collection(dbInstance, 'favorites');
  const flowerFavoritesDocRef = doc(favoritesRef, 'flowerFavorites');
  const flowerFavoritesDoc = await getDoc(flowerFavoritesDocRef);

  if (!flowerFavoritesDoc.exists()) {
    await setDoc(flowerFavoritesDocRef, {});
  }

  updateDoc(flowerFavoritesDocRef, {
    [selectedFlower.id]: selectedFlower,
  });
};