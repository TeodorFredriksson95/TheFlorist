
import React, { useEffect } from 'react';
import {ActivityIndicator, FlatList, Text, View, StyleSheet, SafeAreaView, StatusBar} from 'react-native';
import FlowerComponent from './components/FlowerComponent';
import TabViewExample from './components/NavigationComponent';
import { db } from './firebase';
import { getFirestore, collection, addDoc } from 'firebase/firestore';

export default function App() {

  async function addFlower() {
    try {
      const docRef = await addDoc(collection(db, 'flowers'), {
        name: 'Rose',
        color: 'Red',
        price: 10.99
      });
      console.log('Document written with ID: ', docRef.id);
    } catch (error) {
      console.error('Error adding document: ', error);
    }
  }

  useEffect(() => {
    addFlower();
  }, []);

  return (
    <SafeAreaView style={{flex: 1}}>
      <StatusBar backgroundColor={'white'} barStyle={'dark-content'} />
      <TabViewExample/>
    </SafeAreaView>
  );
}




