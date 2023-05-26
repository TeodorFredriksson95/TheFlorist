import React, { useEffect, useRef, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback, Image, Animated } from 'react-native';
import { FetchFlowers, SpecificFlowerData } from '../types/Flowers';
import { styles } from '../css/modalStyles';
import Icon from 'react-native-vector-icons/Entypo';
import { db, app } from '../firebase';
import { getFirestore, collection, doc, updateDoc, getDoc, setDoc } from 'firebase/firestore';
import BouquetsModal from './BouquetsModal';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { MainSpecies, CategoryImages } from '../types/Flowers';

const FlowerModal: React.FC<{
  selectedFlower: SpecificFlowerData | null;
  onClose: () => void;
  isFavorite: boolean;
  onAddToFavorite?: () => void;
  onAddToBouquet?: (bouquetName: string) => void;
  onAddToNewBouquet?: () => void;
  categoryImages: CategoryImages;
  }> = ({ selectedFlower, onClose, isFavorite, onAddToFavorite, onAddToBouquet, onAddToNewBouquet, categoryImages }) => {

  const slideAnim = useRef(new Animated.Value(-1000)).current;  // Slide out of screen at start

  useEffect(() => {
    if (selectedFlower !== null) {
      Animated.timing(slideAnim, {
        toValue: 0,
        duration: 500,
        useNativeDriver: false,
      }).start();
    }
  }, [selectedFlower]);

  const handleSlideOut = () => {
    Animated.timing(slideAnim, {
      toValue: -1000,
      duration: 500,
      useNativeDriver: false,
    }).start(() => {
      // Reset the position for the next mount
      slideAnim.setValue(-1000);
      onClose(); // Start the closing action after the animation
    });
  };

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


if (!selectedFlower || !selectedFlower.commonNamesTranslated) {
    return null; 
}

  return (
    <Modal visible={Boolean(selectedFlower)} transparent={true}>
      <View style={styles.container}>
       <TouchableWithoutFeedback>
          <Animated.View 
            style={[
              styles.modal,
              { transform: [{ translateX: slideAnim }] },
            ]}  
          >
            <TouchableOpacity style={styles.closeButton} onPress={handleSlideOut}>
              <Text style={styles.closeButtonText}>X</Text>
            </TouchableOpacity>
            <Text style={styles.title}>
              {(selectedFlower?.commonNamesTranslated?.swe?.[0] !== undefined
                ? selectedFlower.commonNamesTranslated.swe[0]
                : selectedFlower.commonNamesTranslated.eng[0])}
            </Text>           
              <View style={styles.imageBorder}>
              <Image source={{ uri: selectedFlower.categoryImages.flower[0] }} style={styles.image} />
            </View>
            <Text style={[styles.subtitle, styles.marginSubtitleTop]}>Scientific Name: <Text style={styles.textStyle}>{selectedFlower.mainSpecies.scientific_name}</Text></Text>
            <Text style={styles.subtitle}>Family: <Text style={styles.textStyle}>{selectedFlower.mainSpecies.family}</Text></Text>
            <Text style={styles.subtitle}>Author: <Text style={styles.textStyle}>{selectedFlower.mainSpecies.author}</Text></Text>
            <Text style={styles.subtitle}>Bibliography: <Text style={styles.textStyle}>{selectedFlower.mainSpecies.bibliography}</Text></Text>
            <Text style={styles.subtitle}>Year: <Text style={styles.textStyle}>{selectedFlower.mainSpecies.year}</Text></Text>
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
         </Animated.View>
        </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};

export { FlowerModal };
