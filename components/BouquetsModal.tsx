import React, { useEffect, useState } from 'react';
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback, Image, FlatList } from 'react-native';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { styles } from '../css/modalStyles';
import { styles as cardStyles } from '../css/cardStyles';
import MaterialIcons from 'react-native-vector-icons/MaterialIcons';
import { Alert } from 'react-native';
import { doc, setDoc } from 'firebase/firestore';
import CustomPrompt from './CustomPrompt';
import { FetchFlowers } from '../types/Flowers';

interface BouquetsModalProps {
  visible: boolean;
  onClose: () => void;
  onSelectBouquet: (bouquet: any) => void;
  selectedFlower: FetchFlowers | null;
}
const BouquetsModal: React.FC<BouquetsModalProps> = ({ visible, onClose, onSelectBouquet, selectedFlower }) => {
  const [bouquets, setBouquets] = useState<any[]>([]);
 const [promptVisible, setPromptVisible] = useState<boolean>(false);
const [errorMessage, setErrorMessage] = useState<string>('');

  useEffect(() => {
    const fetchBouquets = async () => {
      const db = getFirestore();
      const bouquetsRef = collection(db, 'Bouquets');
      const snapshot = await getDocs(bouquetsRef);
      const fetchedBouquets = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      console.log(fetchedBouquets)
      setBouquets([{ id: 'placeholder' }, ...fetchedBouquets]);
    };

    if (visible) {
      fetchBouquets();
    }
  }, [visible]);

  const renderItem = ({ item, index }: any) => {
    if (item.id === 'placeholder') {
      return (
        <TouchableOpacity onPress={() => setPromptVisible(true)}>
          <View style={[cardStyles.card, styles.bouquetMargin, { backgroundColor: '#ff0066' }]}>
            <MaterialIcons name="add" size={30} color="white" />
          </View>
        </TouchableOpacity>
      )
    }
    return (
      <TouchableOpacity onPress={() => onSelectBouquet(item)}>
        <Image source={{ uri: item.images[0] }} style={[styles.modalCard, styles.bouquetMargin]} />
        <View style={[styles.imageOverlay, cardStyles.card, styles.bouquetMargin]}>
         <Text style={styles.imageText}>{item.id}</Text>
      </View>
      </TouchableOpacity>
    )
  }

  const keyExtractor = (item: any, index: number) => index.toString();

  return (
    <Modal visible={visible} transparent={true}>
      <View style={styles.container}>
        <TouchableWithoutFeedback>
          <View style={styles.modal}>
            <TouchableOpacity style={styles.closeButton} onPress={onClose}>
              <Text style={styles.closeButtonText} onPress={onClose}>X</Text>
            </TouchableOpacity>
            <Text style={styles.title}>Select a Bouquet</Text>
            <FlatList
              data={bouquets}
              renderItem={renderItem}
              keyExtractor={keyExtractor}
              numColumns={3}
              contentContainerStyle={styles.cardListModal}
              style={cardStyles.flatListMargin}
            />
          </View>
        </TouchableWithoutFeedback>
      </View>
       <CustomPrompt
        visible={promptVisible}
        title="New Bouquet"
        message="Enter the name for the new bouquet"
        onCancel={() => {
            setPromptVisible(false)
          setErrorMessage('')
        }}
        onOk={async (name) => {
              if (!name) {
                console.log('Name cannot be empty');
                return;
            }

            const exists = bouquets.find(bouquet => bouquet.id === name);
            if (exists) {
                setErrorMessage('This name already exists');
                 setPromptVisible(false);
                 return;
            }
            else {
                if (selectedFlower === null){
                    return;
                }
                const newBouquet = { id: name, images: [selectedFlower.img] }; // Assuming you have a selected flower image
                const db = getFirestore();
                await setDoc(doc(db, 'Bouquets', name), newBouquet);
                setBouquets(prevBouquets => [
                prevBouquets[0],
                newBouquet,
                ...prevBouquets.slice(1), 
                ]);
                setPromptVisible(false);
            }
        }}
      />
    </Modal>
  );
};


export default BouquetsModal;
