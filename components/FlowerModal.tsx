import React, { useState } from 'react';
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native';
import { FetchFlowers } from '../types/Flowers';
import { styles } from '../css/modalStyles';
import Icon from 'react-native-vector-icons/Entypo';
import { db, app } from '../firebase';
import { getFirestore, collection, doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import BouquetsModal from './BouquetsModal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';

const FlowerModal: React.FC<{
  selectedFlower: FetchFlowers | null;
  onClose: () => void;
  isFavorite: boolean;
  onAddToFavorite?: () => void;
  onAddToBouquet?: (bouquetName: string) => void;
  onAddToNewBouquet?: () => void;
  }> = ({ selectedFlower, onClose, isFavorite, onAddToFavorite, onAddToBouquet, onAddToNewBouquet }) => {

    const [bouquetName, setBouquetName] = useState('');
    const [isBouquetsModalVisible, setIsBouquetsModalVisible] = useState(false);

    const handleOpenBouquetsModal = () => {
      setIsBouquetsModalVisible(true);
    };

      const handleAddToNewBouquet = () => {
    if (onAddToNewBouquet) {
      onAddToNewBouquet(); 
    }
  };

    const handleAddToBouquet = () => {
      if (bouquetName && onAddToBouquet) {
        onAddToBouquet(bouquetName)
        setBouquetName('')
      }
    }

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
            {isFavorite && onAddToFavorite && (
              <TouchableOpacity style={styles.addToFavoritesItems} onPress={onAddToFavorite}>
                <Text>Add to favorites</Text>
                <Icon name="circle-with-plus" style={styles.iconStyle} size={30} />
              </TouchableOpacity>
            )}
            {!isFavorite && onAddToBouquet && (
      <>
      <TouchableOpacity style={styles.addToFavoritesItems} onPress={handleOpenBouquetsModal}>
          <Text>Add to bouquets</Text>
          <Icon name="circle-with-plus" style={styles.iconStyle} size={30} />
        </TouchableOpacity>
       <BouquetsModal
          visible={isBouquetsModalVisible}
          onClose={() => setIsBouquetsModalVisible(false)}
          onSelectBouquet={async (selectedBouquet) => {
            // Here you can handle the event when the user selects a bouquet.
            // For example, you can update the selected flower's document in Firestore
            // to include the selected bouquet's id in a "bouquets" array field.
            console.log('Selected bouquet:', selectedBouquet);
            setIsBouquetsModalVisible(false);
            
            // Update the selected bouquet's images array to include the selected flower's image
            const bouquet = { ...selectedBouquet, images: [...selectedBouquet.images, selectedFlower.img] };
            const db = getFirestore();
            await setDoc(doc(db, 'Bouquets', selectedBouquet.id), bouquet);
          }}
          selectedFlower={selectedFlower}
        />

      </>
    )}
          </View>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

export { FlowerModal };
