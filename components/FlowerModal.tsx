import React from 'react';
import { Modal, View, Text, TouchableOpacity, Image, StyleSheet, Dimensions } from 'react-native';
import { FetchFlowers } from '../types/Flowers';

const { width, height } = Dimensions.get('window');

const FlowerModal: React.FC<{ selectedFlower: FetchFlowers | null; onClose: () => void }> = ({
  selectedFlower,
  onClose,
}) => {
  if (!selectedFlower) {
    return null;
  }

  return (
    <Modal visible={Boolean(selectedFlower)} transparent={true}>
      <TouchableOpacity style={styles.container} onPress={onClose}>
        <View style={styles.modal}>
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
            <Text style={styles.closeButtonText}>X</Text>
          </TouchableOpacity>
          <Text style={styles.title}>{selectedFlower.common_name}</Text>
          <Text style={styles.subtitle}>{selectedFlower.scientific_name}</Text>
          <Text style={styles.subtitle}>{selectedFlower.family}</Text>
          <Image source={{ uri: selectedFlower.img }} style={styles.image} />
        </View>
      </TouchableOpacity>
    </Modal>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: 'rgba(0,0,0,0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  modal: {
    width: width - 50,
    height: height - 100,
    backgroundColor: '#fff',
    borderRadius: 10,
    padding: 20,
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  closeButton: {
    alignSelf: 'flex-end',
    padding: 10,
  },
  closeButtonText: {
    fontSize: 18,
    fontWeight: 'bold',
  },
  title: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 18,
    marginBottom: 5,
  },
  image: {
    width: '100%',
    height: 200,
    resizeMode: 'cover',
    borderRadius: 10,
  },
});

export { FlowerModal };
