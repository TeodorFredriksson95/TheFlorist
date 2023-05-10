import React from 'react';
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native';
import { FetchFlowers } from '../types/Flowers';
import { styles } from '../css/modalStyles';
import Icon from 'react-native-vector-icons/Entypo';
import { db, app } from '../firebase';
import { getFirestore, collection, doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';

const FlowerModal: React.FC<{ selectedFlower: FetchFlowers | null; onClose: () => void }> = ({
  selectedFlower,
  onClose,
}) => {
const handleAddToFavorites = async () => {
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

  if (!selectedFlower) {
    return null;
  }

  return (
    <Modal visible={Boolean(selectedFlower)} transparent={true}>
      <View style={styles.container}>
        <TouchableWithoutFeedback>
          <View style={styles.modal}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText} onPress={onClose}>X</Text>
            </TouchableOpacity>
            <Text style={styles.title}>{selectedFlower.common_name}</Text>
            <View style={styles.imageBorder}>
              <Image source={{ uri: selectedFlower.img }} style={styles.image} />
            </View>
            <Text style={[styles.subtitle, styles.marginSubtitleTop]}>Scientific Name: <Text style={styles.textStyle}>{selectedFlower.scientific_name}</Text></Text>
            <Text style={styles.subtitle}>Family: <Text style={styles.textStyle}>{selectedFlower.family}</Text></Text>
            <Text style={styles.subtitle}>Author: <Text style={styles.textStyle}>{selectedFlower.author}</Text></Text>
            <Text style={styles.subtitle}>Bibliography: <Text style={styles.textStyle}>{selectedFlower.bibliography}</Text></Text>
            <Text style={styles.subtitle}>Year: <Text style={styles.textStyle}>{selectedFlower.year}</Text></Text>
            <TouchableOpacity style={styles.addToFavoritesItems} onPress={handleAddToFavorites}>
              <Text >Add to favorites </Text>
              <Icon name="circle-with-plus" style={styles.iconStyle} size={30}/>
            </TouchableOpacity>
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

export { FlowerModal };
