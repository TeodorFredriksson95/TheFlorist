import React from 'react';
import { Modal, View, Text, TouchableOpacity, TouchableWithoutFeedback, Image } from 'react-native';
import { FetchFlowers } from '../types/Flowers';
import { styles } from '../css/modalStyles';

const FlowerModal: React.FC<{ selectedFlower: FetchFlowers | null; onClose: () => void }> = ({
  selectedFlower,
  onClose,
}) => {
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
        </View>
      </TouchableWithoutFeedback>
      </View>
    </Modal>
  );
};


export { FlowerModal };
